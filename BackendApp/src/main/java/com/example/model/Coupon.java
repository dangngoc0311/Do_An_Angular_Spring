package com.example.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Coupon")
public class Coupon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name = "name")
	private String name;
	@Column(name = "discountvalue")
	private Float discountvalue;
	@Column(name = "quantity")
	private Integer quantity;
	@Column(name = "type")
	private Boolean type;
	@Column(name = "condition")
	private Float condition;
	@Column(name = "startdate")
	private Date startdate;
	@Column(name = "enddate")
	private Date enddate;
	@Column(name = "status")
	private Boolean status;
	@OneToMany(mappedBy = "objOrderCoupon", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Orders> listOrders;
	@OneToMany(mappedBy = "objCouponUser", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<UserCoupon> listUserCoupons;

	public Coupon() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Coupon(Integer id, String name, Float discountvalue, Integer quantity, Boolean type, Float condition,
			Date startdate, Date enddate, Boolean status, Set<Orders> listOrders, Set<UserCoupon> listUserCoupons) {
		super();
		this.id = id;
		this.name = name;
		this.discountvalue = discountvalue;
		this.quantity = quantity;
		this.type = type;
		this.condition = condition;
		this.startdate = startdate;
		this.enddate = enddate;
		this.status = status;
		this.listOrders = listOrders;
		this.listUserCoupons = listUserCoupons;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Float getDiscountvalue() {
		return discountvalue;
	}

	public void setDiscountvalue(Float discountvalue) {
		this.discountvalue = discountvalue;
	}

	public Boolean getType() {
		return type;
	}

	public void setType(Boolean type) {
		this.type = type;
	}

	public Date getStartdate() {
		return startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public Date getEnddate() {
		return enddate;
	}

	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}

	public Set<Orders> getListOrders() {
		return listOrders;
	}

	public void setListOrders(Set<Orders> listOrders) {
		this.listOrders = listOrders;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public Set<UserCoupon> getListUserCoupons() {
		return listUserCoupons;
	}

	public void setListUserCoupons(Set<UserCoupon> listUserCoupons) {
		this.listUserCoupons = listUserCoupons;
	}

	public Float getCondition() {
		return condition;
	}

	public void setCondition(Float condition) {
		this.condition = condition;
	}

	@Override
	public String toString() {
		return "Coupon [id=" + id + ", name=" + name + ", discountvalue=" + discountvalue + ", quantity=" + quantity
				+ ", type=" + type + ", condition=" + condition + ", startdate=" + startdate + ", enddate=" + enddate
				+ ", status=" + status + ", listOrders=" + listOrders + ", listUserCoupons=" + listUserCoupons + "]";
	}

}
