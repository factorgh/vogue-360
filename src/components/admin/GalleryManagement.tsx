import { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleAlert, Check, Pencil, Plus, Trash2, X } from 'lucide-react';

// Mock data for clothing items
const initialItems = [
  {
    id: 1,
    name: 'Classic Denim Jacket',
    category: 'outerwear',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
  },
  {
    id: 2,
    name: 'Floral Summer Dress',
    category: 'dresses',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
  },
  {
    id: 3,
    name: 'Slim Fit Chinos',
    category: 'pants',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80'
  },
  {
    id: 4,
    name: 'Oversized Knit Sweater',
    category: 'tops',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2188&q=80'
  },
  {
    id: 5,
    name: 'Leather Ankle Boots',
    category: 'footwear',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2380&q=80'
  },
  {
    id: 6,
    name: 'Silk Blouse',
    category: 'tops',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80'
  },
];

// Available categories
const categories = [
  { id: 'tops', name: 'Tops' },
  { id: 'bottoms', name: 'Bottoms' },
  { id: 'dresses', name: 'Dresses' },
  { id: 'outerwear', name: 'Outerwear' },
  { id: 'footwear', name: 'Footwear' },
  { id: 'pants', name: 'Pants' }
];

export default function GalleryManagement() {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<typeof initialItems[0] | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: ''
  });
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      image: ''
    });
    setEditingItem(null);
  };

  const openModal = (item?: typeof initialItems[0]) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        category: item.category,
        price: item.price.toString(),
        image: item.image
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price || !formData.image) {
      setNotification({
        message: 'Please fill in all fields',
        type: 'error'
      });
      return;
    }

    try {
      const priceValue = parseFloat(formData.price);
      if (isNaN(priceValue) || priceValue <= 0) {
        throw new Error('Price must be a positive number');
      }

      const newItem = {
        id: editingItem ? editingItem.id : Date.now(),
        name: formData.name,
        category: formData.category,
        price: priceValue,
        image: formData.image
      };

      if (editingItem) {
        // Update existing item
        setItems(items.map(item => item.id === editingItem.id ? newItem : item));
        setNotification({
          message: 'Item updated successfully',
          type: 'success'
        });
      } else {
        // Add new item
        setItems([...items, newItem]);
        setNotification({
          message: 'Item added successfully',
          type: 'success'
        });
      }

      closeModal();
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        setNotification({
          message: error.message,
          type: 'error'
        });
      }
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
      setNotification({
        message: 'Item deleted successfully',
        type: 'success'
      });
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  // Filter items by category
  const filteredItems = categoryFilter === 'all' 
    ? items 
    : items.filter(item => item.category === categoryFilter);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Gallery Management</h1>
      
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`mb-6 p-4 flex items-center ${
            notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {notification.type === 'success' ? (
            <Check size={20} className="mr-2" />
          ) : (
            <CircleAlert size={20} className="mr-2" />
          )}
          {notification.message}
          <button
            onClick={() => setNotification(null)}
            className="ml-auto p-1"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-2 text-sm transition-colors ${
              categoryFilter === 'all'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setCategoryFilter(category.id)}
              className={`px-4 py-2 text-sm transition-colors ${
                categoryFilter === category.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-black text-white flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add New Item
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white border shadow-sm p-4">
            <div className="aspect-[3/4] overflow-hidden mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-gray-600 mb-1">{categories.find(c => c.id === item.category)?.name}</p>
              <p className="text-black font-semibold mb-4">${item.price.toFixed(2)}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => openModal(item)}
                  className="px-3 py-1.5 bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center text-sm"
                >
                  <Pencil size={16} className="mr-1" />
                  Pencil
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 bg-red-100 text-red-800 hover:bg-red-200 flex items-center text-sm"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-gray-50">
          <p className="text-gray-500 mb-4">No items found in this category.</p>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-black text-white flex items-center mx-auto"
          >
            <Plus size={18} className="mr-2" />
            Add New Item
          </button>
        </div>
      )}
      
      {/* Add/Pencil Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingItem ? 'Pencil Item' : 'Add New Item'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none"
                      placeholder="e.g. Classic Denim Jacket"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none appearance-none"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none"
                      placeholder="e.g. 129.99"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  {formData.image && (
                    <div className="aspect-[3/2] overflow-hidden mt-2 border">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white flex-1"
                  >
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
