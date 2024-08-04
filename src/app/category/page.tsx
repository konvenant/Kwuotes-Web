'use client';

import React, { useEffect, useState , useCallback } from 'react';
import axios from 'axios';
import { Category, CategoryToSave, Tag } from '@/components/ui/interface';
import styles from './categoryPage.module.css';
import {getCategories, saveCategories} from "../lib/actions"
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import StateModal from '@/components/ui/modal';
import { useAuth } from '@/contexts/AuthContext';

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryToSave[]>([]);
  const [myCategories, setMyCategories] = useState<CategoryToSave[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal,setModal] = useState(false)
  const { user } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response  = await axios.get('https://api.quotable.io/tags');
          if(response.data != null){
            console.log(response.data);
            const theTags: Tag[] = response.data
            const tags : CategoryToSave[] = theTags.map((cat : Tag)=>{
               return {
                id: cat._id,
                name: cat.name,
                quoteCount: cat.quoteCount,
                dateAdded: cat.dateAdded,
                dateModified: cat.dateModified
               }
            })
            
            setCategories(tags)

            
          }

          
      } catch (err: any) {
        setError(err.message || 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }

    };

    const fetchMyCategories = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await getCategories(user.username);
           if (response != null) {
            setMyCategories(response);
           }
          const ids = response.map((cat:CategoryToSave)=>{
          return cat.id
          });
            const newSelectedCategories = new Set(ids);
           setSelectedCategories(newSelectedCategories);
        } catch (err: any) {
          setError(err.message || 'Failed to fetch categories');
        } finally {
          setLoading(false);
        }
    }

    fetchCategories();
    fetchMyCategories();

    if (categories == null) {
      setModal(true)
    }
  }, [modal]);




  
  const handleCheckboxChange = (id: string) => {
    setSelectedCategories((prev) => {
      const newSelectedCategories = new Set(prev);
      if (newSelectedCategories.has(id)) {
        newSelectedCategories.delete(id);
      } else {
        newSelectedCategories.add(id);
      }
      return newSelectedCategories;
    });
    console.log("Current:",selectedCategories);
    
  };

  const getMyCatChecked = useCallback((categoryId: string) : boolean => {
    const myCat = categories.find((category) => category.id === categoryId)
    return myCat != null
  }, []);


  const handleCheckMyCat = async (categoryId: string) => {
    setMyCategories((prev) => {
      return prev.filter((cat) => cat.id !== categoryId);
    });
  };

  const router = useRouter();
  const handleSave = async () => {
    if (selectedCategories.size === 0) {
      alert('Please select at least one category');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const selectedCategoryObjects: CategoryToSave[] = Array.from(selectedCategories)
  .map((id) => categories.find((category) => category.id === id)?.id) // Use optional chaining
  .filter((categoryId) => categoryId !== undefined) // Filter out undefined values
  .map((categoryId) => categories.find((category) => category.id === categoryId)!); // Use non-null assertion after filtering


      console.log("MYCAT:" , selectedCategoryObjects);
        await saveCategories(selectedCategoryObjects, user.username);
      

    
      toast('Categories saved successfully');
      router.push(`/dashboard`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save categories');
      alert('Failed to save categories');
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className={styles.container}>
      <h1>Choose Categories</h1>
      <button onClick={handleSave} className={styles.saveButton}>
        Save
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className={styles.categoriesList}>
          {categories != null && categories.map((category) => (
            <div key={category.id} className={styles.categoryItem}>
              <input
                type="checkbox"
                checked={selectedCategories.has(category.id)}
                onChange={() => handleCheckboxChange(category.id)}
              />
              <label>
                {category.name} ({category.quoteCount} quotes)
              </label>
            </div>
          )) 
          }
        
        { modal &&
          <StateModal
        isOpen 
        message='No Categories found, Reload'
         onClose={()=> setModal(false)}
         />
        }
        
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
