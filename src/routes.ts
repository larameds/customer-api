import { Router } from "express";
import { Controller } from "./controller"; 

const routes = Router();
const customerController = new Controller();

routes.get("/customers", (req, res, next) => { 
    customerController.findAll(req, res).catch(next); 
});

routes.get("/customers/:id", (req, res, next) => {
    customerController.findById(req, res).catch(next); 
});

routes.post("/customers", (req, res, next) => { 
    customerController.create(req, res).catch(next); 
});

routes.delete("/customers/:id", (req, res, next) => { 
    customerController.delete(req, res).catch(next); 
});

routes.put("/customers/:id", (req, res, next) => { 
    customerController.update(req, res).catch(next); 
});

export { routes };