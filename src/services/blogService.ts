import { collection, addDoc, getDocs, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Definir la estructura de un blog
export interface Blog {
  id?: string;
  title: string;
  author: string;
  category: string;
  date: string;
  description: string;
  img: string;
  content1: string;
  content2: string;
  img2?: string;
  img3?: string;
}

// Agregar un nuevo blog
export const addBlog = async (blogData: Blog): Promise<void> => {
  try {
    await addDoc(collection(db, "blogs"), blogData);
    console.log("✅ Blog agregado correctamente!");
  } catch (error) {
    console.error("❌ Error al agregar el blog:", error);
    throw error;
  }
};

// Obtener todos los blogs
export const getBlogs = async (): Promise<Blog[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title ?? "",
        author: data.autor ?? "Autor desconocido", // <-- corregido aquí
        category: data.category ?? "",
        date: data.date ?? "",
        description: data.description ?? "",
        img: data.img ?? "",
        content1: data.content1 ?? "",
        content2: data.content2 ?? "",
        img2: data.img2 ?? "",
        img3: data.img3 ?? "",
      };
    });
  } catch (error) {
    console.error("❌ Error obteniendo los blogs:", error);
    return [];
  }
};


// Obtener un solo blog por ID
export const getBlogById = async (id: string): Promise<Blog | null> => {
  try {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title ?? "",
        author: data.autor ?? "Autor desconocido",
        category: data.category ?? "",
        date: data.date ?? "",
        description: data.description ?? "",
        img: data.img ?? "",
        content1: data.content1 ?? "",
        content2: data.content2 ?? "",
        img2: data.img2 ?? "",
        img3: data.img3 ?? "",
      };
    } else {
      console.warn("⚠️ No se encontró el blog con ID:", id);
      return null;
    }
  } catch (error) {
    console.error("❌ Error obteniendo el blog:", error);
    return null;
  }
};


// Actualizar un blog
export const updateBlog = async (id: string, updatedData: Partial<Blog>): Promise<void> => {
  try {
    const blogRef = doc(db, "blogs", id);
    await updateDoc(blogRef, updatedData);
    console.log("✅ Blog actualizado correctamente!");
  } catch (error) {
    console.error("❌ Error al actualizar el blog:", error);
    throw error;
  }
};

// Eliminar un blog
export const deleteBlog = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "blogs", id));
    console.log("✅ Blog eliminado correctamente!");
  } catch (error) {
    console.error("❌ Error al eliminar el blog:", error);
    throw error;
  }
};
