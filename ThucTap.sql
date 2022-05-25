CREATE DATABASE ProjectThucTap
GO
USE ProjectThucTap
GO
CREATE TABLE Category(
id INT PRIMARY KEY IDENTITY,
name NVARCHAR(100) UNIQUE,
status BIT DEFAULT 1
)
GO
INSERT into Category  values(N'Sach khoa hoc',1)

GO
CREATE TABLE Book(
id INT PRIMARY KEY IDENTITY,
name NVARCHAR(225) UNIQUE NOT NULL,
author NVARCHAR(150) NOT NULL,
publisher NVARCHAR(200) NOT NULL,
price FLOAT NOT NULL,
saleprice FLOAT NULL,
typesale BIT NULL ,
description NTEXT NOT NULL,
image NVARCHAR(250) NOT NULL,
quantity INT NOT NULL,
categoryid INT FOREIGN KEY REFERENCES Category(id) NOT NULL,
hot BIT DEFAULT 0,
status BIT DEFAULT 1
)
GO
CREATE TABLE Account(
id INT PRIMARY KEY IDENTITY,
name NVARCHAR(150) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
phone VARCHAR(10) UNIQUE NOT NULL,
address NVARCHAR(150) NOT NULL,
password VARCHAR(150) NOT NULL,
role BIT DEFAULT(1),
status BIT DEFAULT 1
)

CREATE TABLE Coupon(
id INT PRIMARY KEY IDENTITY,
name NVARCHAR(150) NOT NULL,
discountvalue FLOAT NOT NULL,
type BIT DEFAULT 0 ,
condition FLOAT  DEFAULT 0,
quantity INT NOT NULL,
startdate DATE NOT NULL,
enddate DATE NOT NULL,
status BIT DEFAULT 1
);
GO
CREATE TABLE Orders(
id INT PRIMARY KEY IDENTITY,
name NVARCHAR(150) NOT NULL,
phone VARCHAR(10) NOT NULL,
address NVARCHAR(150) NOT NULL,
accountid INT FOREIGN KEY REFERENCES Account(id) NOT NULL,
subtotalprice FLOAT NOT NULL,
orderdate DATETIME DEFAULT GETDATE() NOT NULL,
couponid INT FOREIGN KEY REFERENCES Coupon(id),
note NTEXT,
status TINYINT DEFAULT 0,
updatedat DATETIME DEFAULT GETDATE() NOT NULL
)
GO
CREATE TABLE Orderdetail(
id INT PRIMARY KEY IDENTITY,
bookid INT FOREIGN KEY REFERENCES Book(id) NOT NULL,
orderid INT FOREIGN KEY REFERENCES Orders(id) NOT NULL,
quantity INT NOT NULL,
price FLOAT NOT NULL
)
GO
CREATE TABLE Reviewbook(
id INT PRIMARY KEY IDENTITY,
accountid INT FOREIGN KEY REFERENCES Account(id) NOT NULL,
bookid INT FOREIGN KEY REFERENCES Book(id) NOT NULL,
rating INT NOT NULL,
description NVARCHAR(150) NOT NULL,
status BIT DEFAULT 0,
reviewdate DATETIME DEFAULT GETDATE() NOT NULL
)
GO
CREATE TABLE Usercoupon(
id INT PRIMARY KEY IDENTITY,
accountid INT FOREIGN KEY REFERENCES Account(id) NOT NULL,
couponid INT FOREIGN KEY REFERENCES Coupon(id) NOT NULL,
status BIT DEFAULT 1
)
GO
CREATE TRIGGER successDelivery
ON Orders 
FOR INSERT, UPDATE, DELETE 
AS BEGIN
UPDATE Orders SET status=3 WHERE DATEDIFF(day, Orders.updatedat, GETDATE())>=7
END
GO
CREATE TRIGGER outStockProduct
ON Book 
FOR INSERT, UPDATE, DELETE 
AS BEGIN
UPDATE Book SET status=0 WHERE Book.quantity=0
END
GO
CREATE TRIGGER outStockCoupon
ON Coupon 
FOR INSERT, UPDATE, DELETE 
AS BEGIN
UPDATE Coupon SET status=0 WHERE quantity=0
END
GO

SELECT DISTINCT c.id,c.name, c.startdate,c.condition,c.discountvalue,c.enddate,
c.quantity,c.type,u.accountid,CASE WHEN u.accountid =3 THEN u.status  
ELSE  0 END as status  from Coupon c left join Usercoupon u on c.id = u.couponid 
where c.status !=0 ;
GO

SELECT DISTINCT c.* FROM Coupon c 
left join Usercoupon u on c.id = u.couponid 
Where c.status !=0 and c.id NOT IN 
(SELECT couponid FROM Usercoupon where accountid=3)
GO

select * from Orderdetail join Orders on Orders.id= Orderdetail.orderid 
where Orderdetail.bookid=16 and Orders.accountid=4

DROP DATABASE ProjectThucTap
