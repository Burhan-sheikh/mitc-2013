import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';
import ProductForm from '@components/products/ProductForm';
import ProductCard from '@components/common/ProductCard';
import Button from '@components/common/Button';
import { useState } from 'react';
import { useProducts, createProduct, updateProduct, deleteProduct } from '@hooks/useProducts';

export default function AdminProducts() {
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const { products, loading } = useProducts();

  const handleAdd = () => { setEditProduct(null); setShowForm(true); };
  const handleEdit = (product) => { setEditProduct(product); setShowForm(true); };
  const handleDelete = async (prodId) => { if(window.confirm('Delete this product?')) await deleteProduct(prodId); };
  const handleFormSubmit = async (data) => {
    if(editProduct) await updateProduct(editProduct.id, data);
    else await createProduct(data);
    setShowForm(false);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="flex flex-1 min-h-0">
        <Sidebar/>
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Products</h1>
            <Button onClick={handleAdd}>Add New Product</Button>
          </div>
          {showForm && <div className="mb-8"><ProductForm product={editProduct} onSubmit={handleFormSubmit} onCancel={()=>setShowForm(false)} /></div>}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full p-8 text-center text-gray-400">Loading...</div>
            ) : products.length === 0 ? (
              <div className="col-span-full text-gray-400">No products found.</div>
            ) : (
              products.map(product => (
                <div key={product.id}>
                  <ProductCard product={product}/>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="secondary" onClick={()=>handleEdit(product)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={()=>handleDelete(product.id)}>Delete</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
