import { JsonController, Get } from "routing-controllers";
import { getRepository, Repository } from "typeorm";
import { Category } from '../models/Category';
import { Color } from '../models/Color';
import { Product } from '../models/Product';
@JsonController("/utils")
export class UtilsController {
    private category: Repository<Category>;
    private product: Repository<Product>;
    private color: Repository<Color>;
    constructor() {
        this.category = getRepository<Category>(Category);
        this.color = getRepository<Color>(Color);
        this.product = getRepository<Product>(Product);
    }

    @Get('/category')
    getCategories() {
        // TODO - Implement active check (must add prop to table)
        return this.category.findAndCount();
    }

    @Get('/color')
    getColors() {
        // TODO - Implement active check (must add prop to table)
        return this.color.find();
    }

    @Get('/product-count')
    getProductCount() {
        return this.product.count({ where: { active: 1 } });
    }
    // @Post()
    // async createProduct(@Body() product: Product) {
    //     //   product.createdAt = new Date();
    //     //   product.updatedAt = new Date();
    //     return this.category.save(product);
    // }

    // @Patch()
    // async updateProduct(@Body() product: Product) {
    //     return this.category.save(product);
    // }

    // @Post()
    // saveImages() {
    //     z
    // }
}
