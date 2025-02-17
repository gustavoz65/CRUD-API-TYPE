export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B> {
  body?: B; // Corpo da requisição (usado para POST/PUT)
  params?: { [key: string]: string }; // Parâmetros de rota/query
  headers?: { [key: string]: string }; // Cabeçalhos HTTP
}
