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
@Table(name = "Usercoupon")
public class UserCoupon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name = "status")
	private Boolean status;
	@ManyToOne
	@JoinColumn(name = "couponid", referencedColumnName = "id")
	private Coupon objCouponUser;
	@ManyToOne
	@JoinColumn(name = "accountid", referencedColumnName = "id")
	private Account objUserCoupon;

	public UserCoupon() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserCoupon(Integer id, Boolean status, Account objUserCoupon, Coupon objCouponUser) {
		super();
		this.id = id;
		this.status = status;
		this.objUserCoupon = objUserCoupon;
		this.objCouponUser = objCouponUser;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public Account getObjUserCoupon() {
		return objUserCoupon;
	}

	public void setObjUserCoupon(Account objUserCoupon) {
		this.objUserCoupon = objUserCoupon;
	}

	public Coupon getObjCouponUser() {
		return objCouponUser;
	}

	public void setObjCouponUser(Coupon objCouponUser) {
		this.objCouponUser = objCouponUser;
	}

}
