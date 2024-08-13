## Instalação

clone o repositório:

```bash
git clone https://github.com/nginpay/supero.git
```

## Executar o projeto com o docker


```bash
docker-compose up --build
```

## Para ver a documentação (swagger) da aplicação gerada de forma automatizada pelo Swagger-UI
```bash
http://localhost:3000/api
```

## Exemplo de body para criação de cliente
```
{
    "nome": "teste",
    "cnpj": "1234567000100",
    "dataContrato": "10-08-2024",
    "valorContrato": 1000,
    "situacaoContrato": "Ativo"
}
```