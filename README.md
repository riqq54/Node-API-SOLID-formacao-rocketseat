# App

Aplicação parecida com o GymPass:

## RF

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível se obter o número de check-ins realizados pelo usuário logado;
- [X] Deve ser possível o usuário obter seu histórico de check-ins;
- [X] Deve ser possível buscar academias próximas (até 10 km);
- [X] Deve ser possível buscar academias pelo nome;
- [X] Deve ser possível realizar check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academias;

## RN

- [X] O usuário não pode se cadastrar com o e-mail duplicado;
- [X] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [X] O check-in só pode ser validado até 20 minutos após ser criado;
- [X] O check-in só pode ser validado por administradores;
- [X] Academias só podem ser cadastradas por adminitradores;

## RNF

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam persistir em um banco de dados PostgreSQL;
- [X] Todas as listas de dados precisam estar paginadas com 20 itens por páginas;
- [X] O usuário deve ser identificado por um JWT (JSON Web Token);

