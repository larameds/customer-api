import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Controller{

    async findAll(req: Request, res: Response) {
        try {
            const customers = await prisma.customers.findMany();
            return res.status(200).json(customers);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }

    async findById(req: Request, res: Response){
        try {
            const { id } = req.params;
            const customer = await prisma.customers.findUnique({
                where: { id },
            });
            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            res.json(customer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }   
    }

    async create(req: Request, res: Response){
        try {
            const { name , email, document } = req.body;
            const costumer = await prisma.customers.create({
                data: {
                    name,
                    document,
                    email
                }
            });
            return res.status(201).json(costumer);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }

    async delete(req: Request, res: Response){
        try {
            const { id } = req.params;
            const deletedCustomer = await prisma.customers.delete({
                where: { id },
            });
            if (!deletedCustomer) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            res.json({ message: 'Customer deleted successfully' });
        } catch(error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error'});
        }
    }

    async update(req: Request, res: Response){
        try {
            const { id } = req.params;
            const { name, document, email } = req.body;
            const updatedCustomer = await prisma.customers.update({
                where: { id },
                data: {
                    name,
                    document,
                    email,
                    updateAt: new Date(),
                },
            });
            if (!updatedCustomer) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            res.json(updatedCustomer);
        } catch (error) {
            console.error(error);  
            res.status(500).json({ error: 'Internal server error'});
        }   
    }

}

export { Controller }