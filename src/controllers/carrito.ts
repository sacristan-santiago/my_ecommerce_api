import {Request, Response, NextFunction} from "express";
import {carritoAPI} from "../apis/carrito";
import {productsAPI} from "../apis/productos";
import { EmailGmailService } from "../services/mailservice";
import { twilioService } from "../services/twilio";
import Config from "../config"
// import {carritoQuery} from "../models/carrito/carrito.interface";

class Carrito {
    async getCartByUser(req: Request, res: Response) {
        const user: any = req.user;
        const cart = await carritoAPI.getCart(user._id);
        res.json(cart);
      }
    
      async addProduct(req: Request, res: Response) {
        const user: any = req.user;
        const cart = await carritoAPI.getCart(user._id);
    
        const { productId, productAmount } = req.body;
    
        if (!productId || !productAmount)
          return res.status(400).json({ msg: 'Invalid body parameters' });
    
        const product = await productsAPI.getProducts(productId);
    
        if (!product.length)
          return res.status(400).json({ msg: 'product not found' });
    
        if (parseInt(productAmount) < 0)
          return res.status(400).json({ msg: 'Invalid amount' });
    
        const updatedCart = await carritoAPI.addProduct(
          cart._id,
          productId,
          parseInt(productAmount)
        );
        res.json({ msg: 'Product added', cart: updatedCart });
      }
    
      async deleteProduct(req: Request, res: Response) {
        const user: any = req.user;
        const cart = await carritoAPI.getCart(user._id);
    
        const { productId, productAmount } = req.body;
    
        if (!productId || !productAmount)
          return res.status(400).json({ msg: 'Invalid body parameters' });
    
        const product = await productsAPI.getProducts(productId);
    
        if (!product.length)
          return res.status(400).json({ msg: 'product not found' });
    
        if (parseInt(productAmount) < 0)
          return res.status(400).json({ msg: 'Invalid amount' });
    
        const updatedCart = await carritoAPI.deleteProduct(
          cart._id,
          productId,
          parseInt(productAmount)
        );
        res.json({ msg: 'Product deleted', cart: updatedCart });
      }

      async submitCart (req: Request, res: Response) {
        const user: any = req.user;
        
        const cart = await carritoAPI.getCart(user.id)
        if (cart.products.length>0) {
          const order = await carritoAPI.submitCart(user._id);
          
          if (order) {
            const mailSubject = `Nuevo pedido de ${user.firstName} ${user.lastName}, mail: ${user.email} `
            const mailContent = `Has adquirido los siguiente productos: ${cart.products}`
            await EmailGmailService.sendEmail(Config.GMAIL_EMAIL, mailSubject, mailContent)

            const smsMessage = "Su pedido ha sido recibido y se encuentra en proceso."
            await twilioService.sendMessage(user.phoneNumber, smsMessage)
            
            const whatsappMessage = mailSubject
            await twilioService.sendWhatsappMessage(Config.ADMINISTRATOR_WHATSAPP_CELLPHONE, whatsappMessage )

            await carritoAPI.clearCart(cart._id)
            
            return res.json({
            order: order
            })
          }

          return res.json({
            msg: "Order did not submit, please try again"
          })
          
        }

        return res.json({
          msg: "Cart is empty, cannot submit order"
        })
      }
}

export const carritoController = new Carrito ();