package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.model.UserCoupon;
import com.example.repository.UsercouponRepository;

@Service
public class UsercouponService {
	private final UsercouponRepository usercouponRepository;

	@Autowired
	public UsercouponService(UsercouponRepository usercouponRepository) {
		this.usercouponRepository = usercouponRepository;
	}

	/**
	 * 
	 * Method insert user coupon
	 * 
	 * @param userCoupon
	 * @return
	 */
	public UserCoupon addUserCoupon(UserCoupon userCoupon) {
		return usercouponRepository.save(userCoupon);
	}

	/**
	 * Method check user coupon(used or not used)
	 * 
	 * @param couponId This value is coupon id to be find
	 * @param userId   This value is account id to be find
	 * @return
	 */
	public UserCoupon findUserCoupon(Integer couponId, Integer userId) {
		return usercouponRepository.findUserCoupon(couponId, userId);
	}

	/**
	 * Method get list user coupon by account id
	 * 
	 * @param accountId This value is account id to be find
	 * @return
	 */
	public List<UserCoupon> findListCouponUser(Integer accountId) {
		return usercouponRepository.findListCouponUser(accountId);
	}

	/**
	 * Method update user coupon
	 * 
	 * @param userCoupon
	 * @return
	 */
	public UserCoupon updateUserCoupon(UserCoupon userCoupon) {
		return usercouponRepository.save(userCoupon);
	}

	/**
	 * Method find user coupon by id
	 * 
	 * @param id
	 * @return
	 */
	public UserCoupon findUserCouponById(Integer id) {
		return usercouponRepository.findUserCouponById(id);
	}
}
