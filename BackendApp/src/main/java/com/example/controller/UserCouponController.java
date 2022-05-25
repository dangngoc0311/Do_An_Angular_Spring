package com.example.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.UserCoupon;
import com.example.service.UsercouponService;

@RestController
@RequestMapping("/user/coupon")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class UserCouponController {
	private final UsercouponService usercouponService;

	public UserCouponController(UsercouponService usercouponService) {
		this.usercouponService = usercouponService;
	}

	/**
	 * The method return user coupon to be insert
	 * 
	 * @param coupon The value to be insert
	 * @return
	 */
	@PostMapping("/insertUserCoupon")
	public ResponseEntity<UserCoupon> insertUserCoupon(@RequestBody UserCoupon coupon) {
		UserCoupon cou = usercouponService.addUserCoupon(coupon);
		return new ResponseEntity<>(cou, HttpStatus.OK);
	}

	/**
	 * The method check exist user coupon inserted
	 * 
	 * @param couponId This value to be find
	 * @param userId   This value to be find
	 * @return
	 */
	@GetMapping("/checkUserCoupon/{couponId}/{userId}")
	public ResponseEntity<UserCoupon> findUserCouponCoupon(@PathVariable("couponId") Integer couponId,
			@PathVariable("userId") Integer userId) {
		UserCoupon us = usercouponService.findUserCoupon(couponId, userId);
		return new ResponseEntity<>(us, HttpStatus.OK);
	}

	/**
	 * The method return list user coupon of user
	 * 
	 * @param userId The value to be find
	 * @return
	 */
	@GetMapping("/findListCouponUser/{userId}")
	public ResponseEntity<List<UserCoupon>> findListCouponUser(@PathVariable("userId") Integer userId) {
		List<UserCoupon> us = usercouponService.findListCouponUser(userId);
		return new ResponseEntity<>(us, HttpStatus.OK);
	}

	/**
	 * The method return user coupon to be update
	 * 
	 * @param id         This value to be find
	 * @param userCoupon The value to be update
	 * @return
	 */
	@PutMapping("/updateUserCoupon/{id}")
	public ResponseEntity<UserCoupon> updateUserCoupon(@PathVariable("id") Integer id,
			@RequestBody UserCoupon userCoupon) {
		UserCoupon cou = usercouponService.findUserCouponById(id);
		cou.setObjCouponUser(userCoupon.getObjCouponUser());
		cou.setObjUserCoupon(userCoupon.getObjUserCoupon());
		cou.setStatus(false);
		UserCoupon updateCou = usercouponService.updateUserCoupon(cou);
		return new ResponseEntity<>(updateCou, HttpStatus.OK);
	}
}
