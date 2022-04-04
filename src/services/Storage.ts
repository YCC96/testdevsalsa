const initDB = () => {
  const request = indexedDB.open("dbTest");
  request.onerror = (event: any) => {
    // console.debug("Error de apertura / creación de base de datos", event);
  };

  request.onupgradeneeded = (event: any) => {
    const db = event.target.result;
    const store = db.createObjectStore("user", {
      keyPath: "id",
    });
    store.createIndex("user", "user", {
      unique: false,
    });
    store.createIndex("email", "email", {
      unique: false,
    });
    store.createIndex("password", "password", {
      unique: false,
    });
  };

  request.onsuccess = (event: any) => {
    addFirtTime();
  };
}

const getList = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("dbTest");
    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(["user"]);
      const objectStore = transaction.objectStore("user");
      const list: any = [];
      // Recorre la base de datos
      objectStore.openCursor().onsuccess = (eventO: any) => {
        const cursor = eventO.target.result;
        if (cursor) {
          list.push(cursor.value);
          cursor.continue();
        }
      };
      resolve(list);
    };
  })
}

const addFirtTime = async () => {
  const responseGetAll: any = await getAll();
  if (responseGetAll && responseGetAll.length === 0) {
    const dataAdd = {
      user: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
    };
    addItem(dataAdd);
  }
}

const addItem = (data: { user: string, email: string, password: string }) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const responseGetAll: any = await getAll();
    const responseFind = responseGetAll.filter((item: any) => item.email === data.email || item.user === data.user);
    if (responseFind && responseFind.length > 0) {
      reject("Username or email already exist");
    } else {
      const request = indexedDB.open("dbTest");
      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const request = db
          .transaction(["user"], "readwrite")
          .objectStore("user")
          .add({
            id: new Date().getTime(),
            ...data,
          });
        request.onsuccess = (event: any) => {
          resolve(event);
        };

        request.onerror = (event: any) => {
          reject("Error.");
        };
      };
    }
  });
}

const updateItem = (data: { user: string, email: string, password: string }) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("dbTest");
    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const request = db.transaction(['user'], 'readwrite').objectStore('user').put({
        ...data
      })
      request.onsuccess = (event: any) => {
        resolve("Success")
      }

      request.onerror = (event: any) => {
        reject("error")
      }
    };

  })
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("dbTest");
    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(['user']);
      const objectStore = transaction.objectStore('user');
      const request = objectStore.getAll();
      request.onerror = function (event: any) {
        // console.debug('No se pudo obtener la lista');
      };
      request.onsuccess = function (event: any) {
        if (request.result) {
          resolve(request.result);
        } else {
          reject(request);
        }
      };
    };

  });
}

const login = (email: string, password: string) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const responseGetAll: any = await getAll();
    const responseFind = responseGetAll.filter((item: any) => item.email === email && item.password === password);
    if (responseFind && responseFind.length > 0) {
      resolve({
        isValid: true,
        user: responseFind[0],
      });
    } else {
      reject({
        isValid: false,
      });
    }
  })
}

const getByEmail = (email: string) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const responseGetAll: any = await getAll();
    const responseFind = responseGetAll.filter((item: any) => item.email === email);
    if (responseFind && responseFind.length > 0) {
      resolve(responseFind[0]);
    } else {
      reject("Not found.");
    }
  })
}

export {
  initDB,
  addItem,
  getList,
  getAll,
  updateItem,
  login,
  getByEmail,
};