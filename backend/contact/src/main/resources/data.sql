INSERT INTO TBL_GROUPS (id, name, description) VALUES
(1, 'Grupo 1', 'Descrição do grupo 1'),
(2, 'Grupo 2', 'Descrição do grupo 2'),
(3, 'Grupo 3', 'Descrição do grupo 3'),
(4, 'Grupo 4', 'Descrição do grupo 4');

INSERT INTO TBL_CONTACTS (ADDRESS, EMAIL, NAME, NOTES, PHONE, group_id) VALUES
('Rua 1', 'f9Ej8@example.com', 'Joao', 'Notas 1', '1234', 1),
('Rua 2', 'gOo5B@example.com', 'Maria', 'Notas 2', '5678', 2),
('Rua 3', '7s1d5@example.com', 'Pedro', 'Notas 3', '9012', 3),
('Rua 4', 'BfK4G@example.com', 'Ana', 'Notas 4', '3456', 4);
