export interface BlogItemType {
    id: string;
    img: string;
    category?: string;
    title: string;
    author: string;
    date?: string;
    description?: string;
    content1?: string; // ✅ Agregado
    content2?: string; // ✅ Agregado
    img2?: string; // ✅ Agregado (segunda imagen)
    img3?: string; // ✅ Agregado (tercera imagen)
}


export const blogItems: BlogItemType[] = [

        {
            id: "1",
            img: "/images/blog_prueba_1.jpg",
            category: "STYLE",
            title: "Butter Yellow is hot!",
            author: "BY LUCAS CONTARDI",
            date: "August 16, 2016",
            description: "Descubre cómo el amarillo mantequilla se está convirtiendo en el color de moda.",
            content1: "El color amarillo mantequilla ha sido visto en pasarelas y alfombras rojas...",
            content2: "Incluso grandes marcas como Chanel y Dior han apostado por esta tonalidad...",
            img2: "/images/blog_prueba_2.jpg", // Segunda imagen
            img3: "/images/blog_prueba_3.jpg"  // Tercera imagen
        },

    
        {
            id: "2",
            img: "/images/blog_prueba_1.jpg",
            category: "STYLE",
            title: "Butter Yellow is hot!",
            author: "BY LUCAS CONTARDI",
            date: "August 16, 2016",
            description: "Descubre cómo el amarillo mantequilla se está convirtiendo en el color de moda.",
            content1: "El color amarillo mantequilla ha sido visto en pasarelas y alfombras rojas...",
            content2: "Incluso grandes marcas como Chanel y Dior han apostado por esta tonalidad...",
            img2: "/images/blog_prueba_2.jpg", // Segunda imagen
            img3: "/images/blog_prueba_3.jpg"  // Tercera imagen
        },
        {
            id: "3",
            img: "/images/blog_prueba_1.jpg",
            category: "STYLE",
            title: "Butter Yellow is hot!",
            author: "BY LUCAS CONTARDI",
            date: "August 16, 2016",
            description: "Descubre cómo el amarillo mantequilla se está convirtiendo en el color de moda.",
            content1: "El color amarillo mantequilla ha sido visto en pasarelas y alfombras rojas...",
            content2: "Incluso grandes marcas como Chanel y Dior han apostado por esta tonalidad...",
            img2: "/images/blog_prueba_2.jpg", // Segunda imagen
            img3: "/images/blog_prueba_3.jpg"  // Tercera imagen
        },

        {
            id: "4",
            img: "/images/blog_prueba_1.jpg",
            category: "STYLE",
            title: "Butter Yellow is hot!",
            author: "BY LUCAS CONTARDI",
            date: "August 16, 2016",
            description: "Descubre cómo el amarillo mantequilla se está convirtiendo en el color de moda.",
            content1: "El color amarillo mantequilla ha sido visto en pasarelas y alfombras rojas...",
            content2: "Incluso grandes marcas como Chanel y Dior han apostado por esta tonalidad...",
            img2: "/images/blog_prueba_2.jpg", // Segunda imagen
            img3: "/images/blog_prueba_3.jpg"  // Tercera imagen
        },

        {
            id: "5",
            img: "/images/blog_prueba_1.jpg",
            category: "STYLE",
            title: "Butter Yellow is hot!",
            author: "BY LUCAS CONTARDI",
            date: "August 16, 2016",
            description: "Descubre cómo el amarillo mantequilla se está convirtiendo en el color de moda.",
            content1: "El color amarillo mantequilla ha sido visto en pasarelas y alfombras rojas...",
            content2: "Incluso grandes marcas como Chanel y Dior han apostado por esta tonalidad...",
            img2: "/images/blog_prueba_2.jpg", // Segunda imagen
            img3: "/images/blog_prueba_3.jpg"  // Tercera imagen
        },

];


/*

Extraer los datos de los blogs a un archivo separado (blogData.ts), lo que permite reutilizarlos en varios componentes.

Antes, cada componente (Blog.tsx y Bloggers.tsx) tenía su propio array de blogs, lo que generaba duplicación de código. Ahora, ambos importan los datos desde blogData.ts, 

asegurando que siempre muestren la misma información sin necesidad de mantener dos listas separadas.

*/