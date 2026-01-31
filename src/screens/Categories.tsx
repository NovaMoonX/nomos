import { useState } from 'react';
import {
  Card,
  Badge,
  Button,
  Modal,
  Form,
  FormFactories,
} from '@moondreamsdev/dreamer-ui/components';
import { useToast } from '@moondreamsdev/dreamer-ui/hooks';
import { Plus, Trash } from '@moondreamsdev/dreamer-ui/symbols';
import { useCategories } from '@hooks/useCategories';
import type { Category, ImportanceLevel } from '@lib/types';

const importanceOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

const importanceBadgeVariant = {
  low: 'muted' as const,
  medium: 'primary' as const,
  high: 'warning' as const,
  critical: 'destructive' as const,
};

interface CategoryFormData {
  name: string;
  description: string;
  importance: ImportanceLevel;
  color: string;
}

export function Categories() {
  const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategories();
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleOpenCreateModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (data: CategoryFormData) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, {
          name: data.name,
          description: data.description || null,
          importance: data.importance,
          color: data.color || null,
        });
        addToast({
          title: 'Success',
          description: 'Category updated successfully.',
          type: 'success',
        });
      } else {
        await createCategory({
          name: data.name,
          description: data.description || null,
          importance: data.importance,
          color: data.color || null,
        });
        addToast({
          title: 'Success',
          description: 'Category created successfully.',
          type: 'success',
        });
      }
      handleCloseModal();
    } catch (error) {
      addToast({
        title: 'Error',
        description: (error as Error).message,
        type: 'error',
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await deleteCategory(id);
      addToast({
        title: 'Success',
        description: 'Category deleted successfully.',
        type: 'success',
      });
    } catch (error) {
      addToast({
        title: 'Error',
        description: (error as Error).message,
        type: 'error',
      });
    }
  };

  const formFields = [
    FormFactories.input({
      name: 'name',
      label: 'Name',
      required: true,
      placeholder: 'e.g., Health, Career, Relationships',
    }),
    FormFactories.textarea({
      name: 'description',
      label: 'Description',
      placeholder: 'Describe what this category represents...',
      rows: 3,
    }),
    FormFactories.select({
      name: 'importance',
      label: 'Importance',
      required: true,
      options: importanceOptions,
    }),
    FormFactories.input({
      name: 'color',
      label: 'Color',
      placeholder: '#3B82F6',
    }),
  ];

  if (loading) {
    return (
      <div className="page flex items-center justify-center">
        <p className="text-foreground/60">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="page p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Categories</h1>
            <p className="text-foreground/60">
              Organize your goals with life categories
            </p>
          </div>
          <Button onClick={handleOpenCreateModal}>
            <Plus className="mr-2" />
            Create Category
          </Button>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/60 mb-4">
              No categories yet. Create your first category to get started.
            </p>
            <Button onClick={handleOpenCreateModal} variant="outline">
              <Plus className="mr-2" />
              Create Your First Category
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="relative">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <Button
                    onClick={() => handleOpenEditModal(category)}
                    variant="tertiary"
                    size="icon"
                    aria-label="Edit category"
                  >
                    Edit
                  </Button>
                </div>
                
                {category.description && (
                  <p className="text-foreground/80 mb-4">{category.description}</p>
                )}
                
                <div className="flex items-center gap-2">
                  <Badge variant={importanceBadgeVariant[category.importance]}>
                    {category.importance}
                  </Badge>
                  {category.color && (
                    <div
                      className="w-6 h-6 rounded-full border-2 border-border"
                      style={{ backgroundColor: category.color }}
                      aria-label="Category color"
                    />
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Button
                    onClick={() => handleDelete(category.id, category.name)}
                    variant="tertiary"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash className="mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCategory ? 'Edit Category' : 'Create Category'}
      >
        <Form
          form={formFields}
          initialData={{
            name: editingCategory?.name || '',
            description: editingCategory?.description || '',
            importance: editingCategory?.importance || 'medium',
            color: editingCategory?.color || '',
          }}
          onSubmit={handleSubmit}
          submitButton={
            <Button type="submit">
              {editingCategory ? 'Update Category' : 'Create Category'}
            </Button>
          }
        />
        <Button onClick={handleCloseModal} variant="outline" className="mt-4 w-full">
          Cancel
        </Button>
      </Modal>
    </div>
  );
}
