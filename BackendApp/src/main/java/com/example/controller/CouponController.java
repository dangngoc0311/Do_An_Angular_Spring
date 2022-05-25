package com.example.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Coupon;
import com.example.service.CouponService;

@RestController
@RequestMapping("/admin/coupon")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class CouponController {
	private final CouponService couponService;

	public CouponController(CouponService CouponService) {
		this.couponService = CouponService;
	}

	/**
	 * The method return list coupon
	 * 
	 * @param pageNumber  This value is the page number
	 * @param pageSize    This value is the size of one page
	 * @param searchValue This value to be find
	 * @param sortColumn  This value is the sort column name
	 * @param sortOrder   This value is sort type
	 * @return
	 */
	@GetMapping("/listCoupon")
	public ResponseEntity<Page<Coupon>> getAllCoupon(
			@RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
			@RequestParam(name = "pageSize", required = false, defaultValue = "6") Integer pageSize,
			@RequestParam(name = "searchValue", required = false) String searchValue,
			@RequestParam(name = "sortColumn", required = false, defaultValue = "id") String sortColumn,
			@RequestParam(name = "sortOrder", defaultValue = "DESC", required = false) String sortOrder) {
		Page<Coupon> coupons = couponService.findAllByName(searchValue, pageNumber, pageSize, sortColumn, sortOrder);
		return new ResponseEntity<>(coupons, HttpStatus.OK);
	}

	/**
	 * The method return coupon find by id
	 * 
	 * @param id This value to be find
	 * @return
	 */
	@GetMapping("/findCoupon/{id}")
	public ResponseEntity<Coupon> getCouponById(@PathVariable("id") Integer id) {
		Coupon coupon = couponService.findCouponById(id);
		return new ResponseEntity<>(coupon, HttpStatus.OK);
	}

	/**
	 * The method return the coupon to be inserted
	 * 
	 * @param coupon The value to be inserted
	 * @return
	 */
	@PostMapping("/insertCoupon")
	public ResponseEntity<Coupon> insertCoupon(@RequestBody Coupon coupon) {
		Coupon cou = couponService.addCoupon(coupon);
		return new ResponseEntity<>(cou, HttpStatus.OK);
	}

	/**
	 * The method return the coupon to be updated
	 * 
	 * @param id     The value to be find
	 * @param coupon The value to be updated
	 * @return
	 */
	@PutMapping("/updateCoupon/{id}")
	public ResponseEntity<Coupon> updateCoupon(@PathVariable("id") Integer id, @RequestBody Coupon coupon) {
		Coupon couUp = couponService.findCouponById(id);
		couUp.setName(coupon.getName());
		couUp.setType(coupon.getType());
		couUp.setQuantity(coupon.getQuantity());
		couUp.setDiscountvalue(coupon.getDiscountvalue());
		couUp.setStartdate(coupon.getStartdate());
		couUp.setEnddate(coupon.getEnddate());
		couUp.setStatus(coupon.getStatus());
		Coupon updateCou = couponService.updateCoupon(couUp);
		return new ResponseEntity<>(updateCou, HttpStatus.OK);
	}

	/**
	 * The method return the coupon to be deleted
	 * 
	 * @param id This value to be find
	 * @return
	 */
	@DeleteMapping("/deleteCoupon/{id}")
	public ResponseEntity<?> deleteCoupon(@PathVariable("id") Integer id) {
		couponService.deleteCoupon(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	/**
	 * The method return list expired coupon of the user
	 * 
	 * @param accId This value to be find
	 * @return
	 */
	@GetMapping("/listExpiredCoupon/{accId}")
	public ResponseEntity<List<Coupon>> getAllExpiredCoupon(@PathVariable("accId") Integer accId) {
		List<Coupon> coupons = couponService.listExpiredCoupon(accId);
		return new ResponseEntity<>(coupons, HttpStatus.OK);
	}
}
