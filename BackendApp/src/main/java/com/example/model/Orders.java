package com.example.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Orders")
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name = "subtotalprice")
	private Double subtotalprice;
	@CreationTimestamp
	@Column(name = "orderdate", nullable = false, updatable = false, columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP")
	private Date orderdate;
	@Column(name = "status")
	private Integer status;
	@Column(name = "note")
	private String note;
	@Column(name = "name")
	private String name;
	@Column(name = "phone")
	private String phone;
	@Column(name = "address")
	private String address;
	 @UpdateTimestamp
	@Column(name = "updatedat")
	private Date updatedat;
	@OneToMany(mappedBy = "objOrder", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<OrderDetail> listOrderDetails;
	@ManyToOne
	@JoinColumn(name = "accountid", referencedColumnName = "id")
	private Account objAccountOrder;
	@ManyToOne
	@JoinColumn(name = "Couponid", referencedColumnName = "id")

	private Coupon objOrderCoupon;

	public Orders() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Orders(Integer id, Double subtotalprice, Date orderdate, Integer status, String note, String name,
			String phone, String address, Date updatedat, Set<OrderDetail> listOrderDetails, Account objAccountOrder,
			Coupon objOrderCoupon) {
		super();
		this.id = id;
		this.subtotalprice = subtotalprice;
		this.orderdate = orderdate;
		this.status = status;
		this.note = note;
		this.name = name;
		this.phone = phone;
		this.address = address;
		this.updatedat = updatedat;
		this.listOrderDetails = listOrderDetails;
		this.objAccountOrder = objAccountOrder;
		this.objOrderCoupon = objOrderCoupon;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getOrderdate() {
		return orderdate;
	}

	public void setOrderdate(Date orderdate) {
		this.orderdate = orderdate;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Set<OrderDetail> getListOrderDetails() {
		return listOrderDetails;
	}

	public void setListOrderDetails(Set<OrderDetail> listOrderDetails) {
		this.listOrderDetails = listOrderDetails;
	}

	public Account getObjAccountOrder() {
		return objAccountOrder;
	}

	public void setObjAccountOrder(Account objAccountOrder) {
		this.objAccountOrder = objAccountOrder;
	}

	public Coupon getObjOrderCoupon() {
		return objOrderCoupon;
	}

	public void setObjOrderCoupon(Coupon objOrderCoupon) {
		this.objOrderCoupon = objOrderCoupon;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Double getSubtotalprice() {
		return subtotalprice;
	}

	public void setSubtotalprice(Double subtotalprice) {
		this.subtotalprice = subtotalprice;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getUpdatedat() {
		return updatedat;
	}

	public void setUpdatedat(Date updatedat) {
		this.updatedat = updatedat;
	}

}
