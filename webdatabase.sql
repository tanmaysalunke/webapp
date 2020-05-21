


CREATE TABLE student_data(
    student_id VARCHAR(30) NOT NULL,
    PRIMARY KEY(student_id)
    );


CREATE TABLE teacher_data(
    teacher_id VARCHAR(30) NOT NULL,
    PRIMARY KEY(teacher_id)
    );



INSERT INTO student_data VALUES 
('318parambil0040'),
('318shiv0097'),
('318tanmay0009'),
('218vaishnavi0010'),
('418abhijeet0074'),
('218vidit0059'),
('118sasmit0011');



INSERT INTO teacher_data VALUES 
('101shiv0001'),
('301amish0040'),
('201tanmay0009'),
('401kshitij0015'),
('101saloni0080');



CREATE TABLE student_login(
	user_moodleid VARCHAR(30) NOT NULL,
  	user_name VARCHAR(50) NULL,
  	user_password VARCHAR(255) NULL,
    FOREIGN KEY(user_moodleid) REFERENCES student_data(student_id)
    );



DELIMITER $$
CREATE PROCEDURE `sp_createUser`(
    IN p_moodleid VARCHAR(30),
    IN p_name VARCHAR(50),
    IN p_password VARCHAR(255)
)
BEGIN
    IF ( select exists (select 1 from student_login where user_moodleid = p_moodleid) ) THEN
     
        select 'Moodle ID exists !!';
     
    ELSE
     
        insert into student_login
        (
        	user_moodleid,
            user_name,
            user_password
        )
        values
        (
        	p_moodleid,
            p_name,
            p_password
        );
     
    END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE PROCEDURE `sp_validateLogin`(
IN p_moodleid VARCHAR(30)
)
BEGIN
    select * from student_login where user_moodleid = p_moodleid;
END$$
DELIMITER ;



CREATE TABLE teacher_login(
    user_teacherid VARCHAR(30) NOT NULL,
    user_name VARCHAR(50) NULL,
    user_password VARCHAR(255) NULL,
    FOREIGN KEY (user_teacherid) REFERENCES teacher_data(teacher_id));



DELIMITER $$
CREATE PROCEDURE `sp_validateTeacherLogin`(
IN p_teacherid VARCHAR(30)
)
BEGIN
    select * from teacher_login where user_teacherid = p_teacherid;
END$$
DELIMITER ;



DELIMITER $$
CREATE PROCEDURE `sp_createTeacher`(
    IN p_teacherid VARCHAR(30),
    IN p_name VARCHAR(50),
    IN p_password VARCHAR(255)
)
BEGIN
    IF ( select exists (select 1 from teacher_login where user_teacherid = p_teacherid) ) THEN
     
        select 'Teacher ID exists !!';
     
    ELSE
     
        insert into teacher_login
        (
            user_teacherid,
            user_name,
            user_password
        )
        values
        (
            p_teacherid,
            p_name,
            p_password
        );
     
    END IF;
END$$
DELIMITER ;


CREATE TABLE score_data(
    user_moodleid VARCHAR(30),
    scorepos int(4),
    scoreneg int(4),
    c1 int(4),
    c2 int(4),
    c3 int(4),
    c4 int(4)
);

CREATE TABLE student_personal(
    student_name VARCHAR(50),
    dob DATE,
    phone INT(11),
    father_name VARCHAR(30),
    mother_name VARCHAR(30),
    city VARCHAR(30),
    profilepic longblob not null
);
