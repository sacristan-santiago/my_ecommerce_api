let productos = [
    {id: 1, nombre: "lapiz", precio: 200},
    {id: 2, nombre: "lapiz2", precio: 210},
    {id: 3, nombre: "lapiz3", precio: 220},
]

interface addProduct {
    nombre: string, 
    precio: number
}

interface Product {
    id: number,
    nombre: string, 
    precio: number
}

class Productos {
    find (id: number) {
        return productos.find(aProduct => aProduct.id == Number(id));
    }
    
    get (id: number | undefined = undefined) {
        if (id) {
            return productos.find(aProduct => aProduct.id == Number(id));
        }
        return productos
    }
    
    add (data: addProduct){
        const newItem = {
            id: productos.length + 1,
            nombre: data.nombre,
            precio: data.precio,
        }
        
        productos.push(newItem);

        return newItem;
    }

    update (id: number, data: addProduct) {
        const replaceItem = {
            id: id,
            nombre: data.nombre,
            precio: Number(data.precio)
        }

        productos = productos.map(aProduct => {
            if (aProduct.id !== id ) {
                return aProduct;
            } else {
                return replaceItem;
            }
        })

        return replaceItem; 
    }

    delete(id: number) {
        const deletedProduct = productos.filter(aProduct => aProduct.id == Number(id));
        productos = productos.filter(aProduct => aProduct.id !== Number(id));
        return deletedProduct;
    }
}

export const productsPersistencia = new Productos ();