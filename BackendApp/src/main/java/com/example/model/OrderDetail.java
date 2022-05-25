package com.example.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "Orderdetail")
public class OrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name = "quantity")
	private Integer quantity;
	@Column(name = "price")
	private Double price;
	@ManyToOne
	@JoinColumn(name = "bookid",referencedColumnName = "id")
	private Book objBookOrder;
	@ManyToOne
	@JoinColumn(name = "orderid",referencedColumnName = "id")
	private Orders objOrder;
	public OrderDetail() {
		super();
		// TODO Auto-generated constructor stub
	}
	public OrderDetail(Integer id, Integer quantity, Double price, Book objBookOrder, Orders objOrder) {
		super();
		this.id = id;
		this.quantity = quantity;
		this.price = price;
		this.objBookOrder = objBookOrder;
		this.objOrder = objOrder;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Book getObjBookOrder() {
		return objBookOrder;
	}
	public void setObjBookOrder(Book objBookOrder) {
		this.objBookOrder = objBookOrder;
	}
	public Orders getObjOrder() {
		return objOrder;
	}
	public void setObjOrder(Orders objOrder) {
		this.objOrder = objOrder;
	}
	
}
