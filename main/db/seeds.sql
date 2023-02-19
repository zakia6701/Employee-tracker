INSERT INTO department (id, department_name)
VALUES (10, "Owners"),
       (20, "Executives"),
       (30, "Mangers"),
       (40, "Engineering"),
       (50, "intern");

INSERT INTO roles (job_title,department_id, salary)
VALUES ("Founder",10,1000000),
       ("CEO",10,100000),
       ("Vice president",20,80000),
       ("Director",20,150000),
       ("Project Manager",30,120000),
       ("Product Manager",30,160000),
       ("Senior Engineer",40,125000),
       ("Lead Enineer",40,250000),
       ("intern",50,190000);

INSERT INTO employee (last_name,first_name,role_id, manager_id)
VALUES ("Ahmed", "Zaki" 10, null),
       ("Edwards","Athony" 2, 1),
       ("Anthony'Towns", "karl"3, 3),
       ("Conley","Mike" 4, 1),
       ("Gobert","Rudy" 5, 4), 
       ("McDaniels","Jaden" 6, 1),
       ("Anderson","Kyle" 7, 5),
       ("Reid","Naz" 8, 1),
       ("Nowel","Jaylen" 9, 6);