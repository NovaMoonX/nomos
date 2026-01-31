import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { db } from '@lib/firebase';
import type { Category } from '@lib/types';
import { useAuthContext } from './useAuth';

export function useCategories() {
  const { user } = useAuthContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setCategories([]);
      setLoading(false);
      return;
    }

    const categoriesRef = collection(db, 'categories');
    const q = query(
      categoriesRef,
      where('ownerId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const categoriesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[];
        setCategories(categoriesData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const createCategory = async (
    categoryData: Omit<Category, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'>
  ) => {
    if (!user) throw new Error('User not authenticated');

    const now = Date.now();
    const newCategory = {
      ...categoryData,
      ownerId: user.uid,
      createdAt: now,
      updatedAt: now,
    };

    const result = await addDoc(collection(db, 'categories'), newCategory);
    
    return result.id;
  };

  const updateCategory = async (
    id: string,
    categoryData: Partial<Omit<Category, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'>>
  ) => {
    if (!user) throw new Error('User not authenticated');

    const categoryRef = doc(db, 'categories', id);
    const updatedData = {
      ...categoryData,
      updatedAt: Date.now(),
    };

    await updateDoc(categoryRef, updatedData);
  };

  const deleteCategory = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    const categoryRef = doc(db, 'categories', id);
    await deleteDoc(categoryRef);
  };

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
