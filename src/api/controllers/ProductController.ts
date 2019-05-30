import { JsonController, Get, Post, Body, Patch, QueryParam, Param, UploadedFile, Req, Res, OnNull, OnUndefined } from "routing-controllers";
import { getRepository, Repository } from "typeorm";
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Color } from '../models/Color';
import { GcUpload } from "../middlewares/google-cloud-storage";
import { Request } from 'express-serve-static-core';
import { Response } from 'express';
import { Photo } from '../models/Photo';

@JsonController("/product")
export class ProductController {
    private product: Repository<Product>;
    private category: Repository<Category>;
    private colors: Repository<Color>;
    private photos: Repository<Photo>;
    constructor() {
        this.product = getRepository<Product>(Product);
        this.category = getRepository<Category>(Category);
        this.colors = getRepository<Color>(Color);
        this.photos = getRepository<Photo>(Photo);
    }

    @Get()
    async getProducts(@QueryParam("idCategory") idCategory?: number) {
        // TODO - Implement active check (must add prop to table)
        if (idCategory)
            return this.product.find({ where: { category: { id: idCategory }, active: 1 }, relations: ["category", "colors", "photos"] });
        else
            return this.product.find({ where: { active: 1 }, relations: ["category", "colors", "photos"], order: { createdAt: "DESC" } });
    }

    @Get('/spotlight/main')
    async get(@QueryParam("idCategory") idCategory?: number) {
        // TODO - Implement active check (must add prop to table)
        return this.product.find({ where: { spotlight: 1 }, relations: ["category", "colors", "photos"] });
    }

    @Post()
    async createProduct(@Body() product: any) {
        product.createdAt = new Date();
        product.updatedAt = new Date();
        product.category = await this.category.findOne(product.category.id);
        product.colors = await this.colors.findByIds(product.colors);

        return this.product.save(product);
    }

    @Patch()
    async updateProduct(@Body() product: any) {
        product.category = this.category.findOne(product.idCategory);
        return this.product.save(product);
    }

    @Get('/disable/:id')
    async diableProduct(@Param("id") id: any) {
        const product = await this.product.findOne(id);
        product.active = 0;
        const a = await this.product.save(product);
        if (a) {
            return { status: true, message: "Produto desativado com sucesso" };
        } else {
            return { status: false, message: "Ocorreu algum erro inesperado" };
        }
    }


    @Get("/:id")
    async getProduct(@Param("id") id: number) {
        // const { storage } = new googleCloud();
        // const a = await storage.getBuckets();
        return this.product.findOneOrFail(id, { relations: ["colors", "photos"] });
    }

    @Post('/images')
    async saveImage(@Req() req: Request, @UploadedFile("file0") image: any, @QueryParam("idProduct") idProduct: number) {
        const gcUpload = new GcUpload();
        gcUpload.sendUploadToGCS(image, req.next);
        await this.sleep(5000);

        // add image url to database
        const product = await this.product.findOne(idProduct);
        let photo = new Photo();

        photo.path = image.gcsUrl;
        photo.product = product;

        // save pic
        return this.photos.save(photo);
    }

    sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }
}
