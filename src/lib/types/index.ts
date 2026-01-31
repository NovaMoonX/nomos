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
  createdAt: number; // Unix timestamp in milliseconds
  updatedAt: number; // Unix timestamp in milliseconds
}

/**
 * Category entity for organizing goals and tasks
 */
export interface Category extends BaseEntity {
  name: string;
  description: string | null;
  importance: ImportanceLevel;
  color: string | null;
}

/**
 * Goal entity representing a high-level objective
 */
export interface Goal extends BaseEntity {
  title: string;
  description: string | null;
  categoryId: string;
  targetDate: number | null; // Unix timestamp in milliseconds
  completed: boolean;
}

/**
 * Task entity representing a specific action item
 */
export interface Task extends BaseEntity {
  title: string;
  description: string | null;
  goalId: string;
  categoryId: string | null;
  dueDate: number | null; // Unix timestamp in milliseconds
  completed: boolean;
  priority: ImportanceLevel | null;
}
