const httpsServer = process.env.NODE_ENV === 'development' ? `http://localhost:8080/` : `/`;
export const Api = `${httpsServer}api/`;
