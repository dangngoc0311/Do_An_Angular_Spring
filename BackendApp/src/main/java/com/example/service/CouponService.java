package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.model.Coupon;
import com.example.repository.CouponRepository;

@Service
public class CouponService {
	private final CouponRepository couponRepository;

	@Autowired
	public CouponService(CouponRepository couponRepository) {
		this.couponRepository = couponRepository;
	}

	/**
	 * Method insert coupon
	 * 
	 * @param coupon
	 * @return
	 */
	public Coupon addCoupon(Coupon coupon) {
		return couponRepository.save(coupon);

	}

	/**
	 * Method search coupon by name with pagination
	 * 
	 * @param searchValue This value is name to be find
	 * @param pageNumber  This value is the page number
	 * @param pageSize    This value is the size of one page
	 * @param sortColumn  This value is the sort column name
	 * @param sortOrder   This value is sort type
	 * @return
	 */
	public Page<Coupon> findAllByName(String searchValue, int pageNumber, int pageSize, String sortColumn,
			String sortOrder) {
		Sort sort = null;
		if (sortOrder.equals("DESC")) {
			sort = Sort.by(Sort.Direction.DESC, sortColumn);
		} else if (sortOrder.equals("ASC")) {
			sort = Sort.by(Sort.Direction.ASC, sortColumn);
		}
		Pageable page = PageRequest.of(pageNumber, pageSize, sort);
		return couponRepository.findCouponByName(searchValue, page);
	}

	/**
	 * Method update coupon
	 * 
	 * @param coupon
	 * @return
	 */
	public Coupon updateCoupon(Coupon coupon) {
		return couponRepository.save(coupon);
	}

	/**
	 * Method find coupon by id
	 * 
	 * @param id
	 * @return
	 */
	public Coupon findCouponById(Integer id) {
		return couponRepository.findCouponById(id);
	}

	/**
	 * Method delete coupon
	 * 
	 * @param id
	 */
	public void deleteCoupon(Integer id) {
		couponRepository.deleteCouponById(id);
	}

	/**
	 * Method get list coupon expired
	 * 
	 * @param accId
	 * @return
	 */
	public List<Coupon> listExpiredCoupon(Integer accId) {
		return couponRepository.findAllCouponExpired(accId);

	}

}
