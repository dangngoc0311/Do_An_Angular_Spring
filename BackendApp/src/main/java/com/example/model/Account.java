package com.example.model;

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
@Table(name = "Account")
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name = "name")
	private String name;
	@Column(name = "email")
	private String email;
	@Column(name = "phone")
	private String phone;
	@Column(name = "address")
	private String address;
	@Column(name = "password")
	private String password;
	@Column(name = "role")
	private Boolean role;
	@Column(name = "status")
	private Boolean status;
	@OneToMany(mappedBy = "objAccountOrder", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Orders> listOrders;
	@OneToMany(mappedBy = "objReviewBook")
	@JsonIgnore
	private Set<ReviewBook> listReviewBokks;
	@OneToMany(mappedBy = "objUserCoupon", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<UserCoupon> listUserCoupons;

	public Account() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Account(Integer id, String name, String email, String phone, String address, String password, Boolean role,
			Boolean status, Set<Orders> listOrders, Set<ReviewBook> listReviewBokks, Set<UserCoupon> listUserCoupons) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.password = password;
		this.role = role;
		this.status = status;
		this.listOrders = listOrders;
		this.listReviewBokks = listReviewBokks;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public Set<Orders> getListOrders() {
		return listOrders;
	}

	public void setListOrders(Set<Orders> listOrders) {
		this.listOrders = listOrders;
	}

	public Set<ReviewBook> getListReviewBokks() {
		return listReviewBokks;
	}

	public void setListReviewBokks(Set<ReviewBook> listReviewBokks) {
		this.listReviewBokks = listReviewBokks;
	}

	public Boolean getRole() {
		return role;
	}

	public void setRole(Boolean role) {
		this.role = role;
	}

	public Set<UserCoupon> getListUserCoupons() {
		return listUserCoupons;
	}

	public void setListUserCoupons(Set<UserCoupon> listUserCoupons) {
		this.listUserCoupons = listUserCoupons;
	}

}
