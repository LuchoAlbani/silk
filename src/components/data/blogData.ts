// src/data/blogData.ts
export interface BlogItemType {
    img: string;
    category?: string; // Opcional para Blog
    title: string;
    author: string;
    date?: string; // Opcional para Bloggers
}

export const blogItems: BlogItemType[] = [
    {
        img: "/images/blog_prueba_1.jpg",
        category: "STYLE",
        title: "Butter Yellow is hot!",
        author: "BY LUCAS CONTARDI",
        date: "August 16, 2016",
    },
    {
        img: "/images/blog_prueba_2.jpg",
        category: "BEAUTY",
        title: "Title Censored",
        author: "BY MAGGIE CRUZ FREZZINI",
        date: "May 24, 2016",
    },
    {
        img: "/images/blog_prueba_3.jpg",
        category: "CELEBRITY",
        title: "Taylor Swift vistiendo Versace",
        author: "BY LUCAS CONTARDI",
        date: "May 24, 2016",
    },

    {
        img: "/images/blog_prueba_4.jpeg",
        category: "GLAMOUR",
        title: "Elegance in the Mirror",
        author: "BY LUCAS CONTARDI",
        date: "May 24, 2016",
    },

    {
        img: "/images/blog_prueba_5.jpeg",
        category: "ICONIC",
        title: "Amarillo Monocromático en la Alfombra Roja",
        author: "BY LUCAS CONTARDI",
        date: "May 24, 2016",
    },

];


/*

Extraer los datos de los blogs a un archivo separado (blogData.ts), lo que permite reutilizarlos en varios componentes.

Antes, cada componente (Blog.tsx y Bloggers.tsx) tenía su propio array de blogs, lo que generaba duplicación de código. Ahora, ambos importan los datos desde blogData.ts, 

asegurando que siempre muestren la misma información sin necesidad de mantener dos listas separadas.

*/