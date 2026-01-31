/**
 * Type definitions for Nomos application entities
 */

/**
 * Importance levels for categories
 */
export type ImportanceLevel = 'low' | 'medium' | 'high' | 'critical';

/**
 * Base entity with common fields
 */
export interface BaseEntity {
  id: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Category entity for organizing goals and tasks
 */
export interface Category extends BaseEntity {
  name: string;
  description?: string;
  importance: ImportanceLevel;
  color?: string;
}

/**
 * Goal entity representing a high-level objective
 */
export interface Goal extends BaseEntity {
  title: string;
  description?: string;
  categoryId: string;
  targetDate?: Date;
  completed: boolean;
}

/**
 * Task entity representing a specific action item
 */
export interface Task extends BaseEntity {
  title: string;
  description?: string;
  goalId: string;
  categoryId?: string;
  dueDate?: Date;
  completed: boolean;
  priority?: ImportanceLevel;
}
