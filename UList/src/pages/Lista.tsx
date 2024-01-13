import React, { useContext, useEffect, useState } from "react";
import { Product } from "../interface/Product.interface";
import { ListContext } from "../context/ListContect";
import { calcularTotal } from "../hooks/calcularTotal";
import Card from "../components/Card";
import { exportData } from "../helpers/exportData";
const Lista = () => {
  const [items, setItems] = useState<Product[]>([]);

  const { products, agregarCarro, eliminar, setProduct, setIsEdit, isEdit } =
    useContext(ListContext);

  const { totalReal } = calcularTotal();
  const { DescargarCSV } = exportData();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("products")!);
    if (items) {
      setItems(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleAgregarCarro = (id: number) => {
    agregarCarro(id);
  };

  const handleEliminar = (id: number) => {
    if (isEdit === true) {
      console.log(isEdit);
      return alert("No puedes eliminar un producto que estés editando.");
    }
    eliminar(id);
  };

  const handleEditar = (id: number, product: Product) => {
    setIsEdit(true);
    setProduct({ ...product });
  };

  return (
    <div>
      <h1 className="text-center">Tu Carrito</h1>
      <div
        className="overflow-auto"
        style={{ maxHeight: "335px", height: "400px" }}
      >
        {products.map((product) => (
          <div key={product.id}>
            <Card
              product={product}
              handleAgregarCarro={handleAgregarCarro}
              handleEditar={handleEditar}
              handleEliminar={handleEliminar}
            />
          </div>
        ))}
      </div>
      <hr />
      <h5 className="text-center">
        Total Real: <span className="fw-bold">$ {totalReal} CLP</span>
      </h5>
      <div className="d-grid gap-2">
      <button  className="btn btn-primary" onClick={() => DescargarCSV()}>
        Exportar Carrito
      </button>
      </div>
     
    </div>
  );
};

export default Lista;
