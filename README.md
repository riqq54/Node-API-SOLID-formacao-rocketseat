# App

Aplicação parecida com o GymPass:

## RF

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível se obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível buscar academias próximas;
- [ ] Deve ser possível buscar academias pelo nome;
- [ ] Deve ser possível realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academias;

## RN

- [ ] O usuário não pode se cadastrar com o e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] Academias só podem ser cadastradas por adminitradores;

## RNF

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam persistir em um banco de dados PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por páginas;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

