const { createApp } = Vue;

const Files = {
  response: [
    {
      name: "src",
      insideFiles: [
        {
          name: "App.js",
        },
        {
          name: "Index.js",
        },
        {
          name: "styles.css",
        },
        {
          name: "components",
          insideFiles: [
            {
              name: "Files.js",
            },
          ],
        },
      ],
    },
    {
      name: "package.json",
    },
  ],
  //status: Math.random() > 0.5 ? "success" : "error",
  };

const fetchFiles = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Files.response);
    }, 1000);
  });
};

//component
const FileStruct = {
  props: ['files', 'status'],
  template: `
    <div>
      <ul v-if="status === 'success'">
        <li v-for="file in files" :key="file.name">
        {{ file.name }}
         <file-struct
          v-if="file.insideFiles && file.insideFiles.length > 0"
          :files="file.insideFiles"
          :status="status"
         >
         </file-struct>
        </li>
      </ul>
      <p v-else-if="status === 'error'">Error al cargar la lista</p>
      <p v-else>Cargando...</p>
    </div>
  `
};

const app = createApp({
  data() {
    return {
      files: [],
      status: 'loading'
    };
  },
  async created() {
    try {
      this.files = await fetchFiles();
      this.status = 'success';
      console.log(this.files)
    } catch (err) {
      this.status = 'error';
      console.error('Error al cargar la lista de archivos', err);
    }
  }
});

app.component('file-struct', FileStruct);
app.mount('#app');
