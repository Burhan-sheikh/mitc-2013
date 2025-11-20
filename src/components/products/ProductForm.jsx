import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { uploadImage } from '@lib/cloudinary';
import { validateRequired, validateNumberRange, validatePriceRange } from '@utils/validators';

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    brand: product?.brand || '',
    shortDescription: product?.shortDescription || '',
    specs: {
      ram: product?.specs?.ram || '',
      storage: product?.specs?.storage || '',
      processor: product?.specs?.processor || '',
      gpu: product?.specs?.gpu || '',
      display: product?.specs?.display || '',
      color: product?.specs?.color || '',
      generation: product?.specs?.generation || '',
      model: product?.specs?.model || '',
    },
    priceRange: {
      low: product?.priceRange?.low || '',
      high: product?.priceRange?.high || '',
    },
    stock: product?.stock || 0,
    bulkAvailable: product?.bulkAvailable || false,
    bulkETA: product?.bulkETA || '',
    status: product?.status || 'draft',
  });

  const [images, setImages] = useState(product?.gallery || []);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const brands = ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus', 'Acer', 'MSI', 'Samsung', 'LG', 'Other'];
  const ramOptions = ['4GB', '8GB', '16GB', '32GB', '64GB', '128GB'];
  const storageOptions = ['128GB SSD', '256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD', '1TB HDD', '2TB HDD'];

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(file => uploadImage(file, 'mitc/products'));
      const results = await Promise.all(uploadPromises);
      const newImages = results.map(result => ({
        url: result.url,
        alt: formData.title,
      }));
      setImages(prev => [...prev, ...newImages]);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.brand) newErrors.brand = 'Brand is required';
    
    const priceErrors = validatePriceRange(formData.priceRange.low, formData.priceRange.high);
    if (priceErrors.length > 0) newErrors.price = priceErrors[0];

    if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        featuredImage: images[0] || null,
        gallery: images,
      });
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        
        <Input
          label="Product Title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          error={errors.title}
          required
          placeholder="e.g., Dell Latitude 7420"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Brand *</label>
            <select
              value={formData.brand}
              onChange={(e) => handleChange('brand', e.target.value)}
              className="input"
              required
            >
              <option value="">Select Brand</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            {errors.brand && <p className="text-sm text-red-500 mt-1">{errors.brand}</p>}
          </div>

          <Input
            label="Stock Quantity"
            type="number"
            value={formData.stock}
            onChange={(e) => handleChange('stock', parseInt(e.target.value))}
            error={errors.stock}
            min="0"
            required
          />
        </div>

        <div>
          <label className="label">Short Description</label>
          <textarea
            value={formData.shortDescription}
            onChange={(e) => handleChange('shortDescription', e.target.value)}
            className="input"
            rows="3"
            maxLength="200"
            placeholder="Brief description of the product..."
          />
        </div>
      </div>

      {/* Specifications */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold">Specifications</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">RAM</label>
            <select
              value={formData.specs.ram}
              onChange={(e) => handleChange('specs.ram', e.target.value)}
              className="input"
            >
              <option value="">Select RAM</option>
              {ramOptions.map(ram => (
                <option key={ram} value={ram}>{ram}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Storage</label>
            <select
              value={formData.specs.storage}
              onChange={(e) => handleChange('specs.storage', e.target.value)}
              className="input"
            >
              <option value="">Select Storage</option>
              {storageOptions.map(storage => (
                <option key={storage} value={storage}>{storage}</option>
              ))}
            </select>
          </div>

          <Input
            label="Processor"
            value={formData.specs.processor}
            onChange={(e) => handleChange('specs.processor', e.target.value)}
            placeholder="e.g., Intel Core i7 11th Gen"
          />

          <Input
            label="GPU"
            value={formData.specs.gpu}
            onChange={(e) => handleChange('specs.gpu', e.target.value)}
            placeholder="e.g., NVIDIA RTX 3050"
          />

          <Input
            label="Display"
            value={formData.specs.display}
            onChange={(e) => handleChange('specs.display', e.target.value)}
            placeholder='e.g., 15.6\" FHD'
          />

          <Input
            label="Color"
            value={formData.specs.color}
            onChange={(e) => handleChange('specs.color', e.target.value)}
            placeholder="e.g., Silver"
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold">Pricing & Availability</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Minimum Price (₹)"
            type="number"
            value={formData.priceRange.low}
            onChange={(e) => handleChange('priceRange.low', e.target.value)}
            error={errors.price}
            required
            min="0"
          />

          <Input
            label="Maximum Price (₹)"
            type="number"
            value={formData.priceRange.high}
            onChange={(e) => handleChange('priceRange.high', e.target.value)}
            required
            min="0"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="bulkAvailable"
            checked={formData.bulkAvailable}
            onChange={(e) => handleChange('bulkAvailable', e.target.checked)}
            className="rounded"
          />
          <label htmlFor="bulkAvailable" className="text-sm">Bulk orders available</label>
        </div>

        {formData.bulkAvailable && (
          <Input
            label="Bulk Order ETA"
            value={formData.bulkETA}
            onChange={(e) => handleChange('bulkETA', e.target.value)}
            placeholder="e.g., 5-7 days"
          />
        )}
      </div>

      {/* Images */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold">Product Images</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
              <img src={image.url} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          
          <label className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 transition-colors">
            {uploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
            ) : (
              <>
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Upload</span>
              </>
            )}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Status */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold">Publication Status</h3>
        
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="draft"
              checked={formData.status === 'draft'}
              onChange={(e) => handleChange('status', e.target.value)}
            />
            <span>Save as Draft</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="published"
              checked={formData.status === 'published'}
              onChange={(e) => handleChange('status', e.target.value)}
            />
            <span>Publish</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={submitting}>
          {product ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
}
