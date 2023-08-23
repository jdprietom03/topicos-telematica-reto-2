import { FileService } from "./classes/FileService";
import { ProductService } from "./classes/ProductService";
import { ProtoService } from "./classes/ProtoService";

export const services: ProtoService[]  = [
	new FileService(),
	new ProductService()
]