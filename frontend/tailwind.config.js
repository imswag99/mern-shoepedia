/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBg: "#2c2c2c",
        text: "#FAF0E6",
        primary: "#872341",
        adminPrimary: "#31112C",
      },
      keyframes: {
        slideshow1: {
          "0%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG5pa2UlMjBzbmVha2Vyc3xlbnwwfDB8MHx8fDA%3D)",
          },
          "20%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1520294890956-4a240865ae85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRpbWJlcmxhbmQlMjBzaG9lc3xlbnwwfDB8MHx8fDA%3D)",
          },
          "40%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1529900672901-908be5302554?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGFkaWRhcyUyMHNob2VzfGVufDB8MHwwfHx8MA%3D%3D)",
          },
          "60%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIwYmFsYW5jZSUyMHNob2VzfGVufDB8MHwwfHx8MA%3D%3D)",
          },
          "80%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1542280756-74b2f55e73ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29udmVyc2UlMjBzaG9lc3xlbnwwfDB8MHx8fDA%3D)",
          },
          "100%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG5pa2UlMjBzbmVha2Vyc3xlbnwwfDB8MHx8fDA%3D)",
          },
        },
        slideshow2: {
          "0%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1552066344-2464c1135c32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNuZWFrZXJzfGVufDB8MHwwfHx8MA%3D%3D)",
          },
          "20%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1592860986140-d77ede8b7116?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHNuZWFrZXJzfGVufDB8MHwwfHx8MA%3D%3D)",
          },
          "40%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNuZWFrZXJzfGVufDB8MHwwfHx8MA%3D%3D)",
          },
          "60%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1556048219-bb6978360b84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fHNuZWFrZXJzfGVufDB8MHwwfHx8MA%3D%3D)",
          },
          "80%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fHNuZWFrZXJzfGVufDB8MHwwfHx8MA%3D%3D)",
          },
          "100%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1552066344-2464c1135c32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNuZWFrZXJzfGVufDB8MHwwfHx8MA%3D%3D)",
          },
        },
        slideshow3: {
          "0%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1584590069631-1c180f90a54c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxzbmVha2Vyc3xlbnwwfDB8MHx8fDA%3D)",
          },
          "20%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1552346053-c33aa8b3d665?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHNuZWFrZXJzfGVufDB8MHwwfHx8MA%3D%3D)",
          },
          "40%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1606753930828-fdcc943a273e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHxzbmVha2Vyc3xlbnwwfDB8MHx8fDA%3D)",
          },
          "60%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1581068506447-40961bd61f9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMyfHxzbmVha2Vyc3xlbnwwfDB8MHx8fDA%3D)",
          },
          "80%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1542219550-a204208f019d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ4fHxzbmVha2Vyc3xlbnwwfDB8MHx8fDA%3D)",
          },
          "100%": {
            backgroundImage: "url(https://images.unsplash.com/photo-1584590069631-1c180f90a54c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxzbmVha2Vyc3xlbnwwfDB8MHx8fDA%3D)",
          },
        },
      },
      animation: {
        slideshow1: 'slideshow1 5s linear infinite',
        slideshow2: 'slideshow2 5s linear infinite',
        slideshow3: 'slideshow3 5s linear infinite',
      }
    },
  },
  plugins: [],
};
