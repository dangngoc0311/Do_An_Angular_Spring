package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.model.ReviewBook;
import com.example.repository.ReviewBookRepository;

@Service
public class ReviewbookService {
	private final ReviewBookRepository reviewBookRepository;

	@Autowired
	public ReviewbookService(ReviewBookRepository reviewBookRepository) {
		this.reviewBookRepository = reviewBookRepository;
	}

	/**
	 * Method insert review
	 * 
	 * @param reviewBook
	 * @return
	 */
	public ReviewBook addReview(ReviewBook reviewBook) {
		return reviewBookRepository.save(reviewBook);
	}

	/**
	 * Method update review
	 * 
	 * @param reviewBook
	 * @return
	 */
	public ReviewBook updateReview(ReviewBook reviewBook) {
		return reviewBookRepository.save(reviewBook);
	}

	/**
	 * Method get all list review with pagination
	 * 
	 * @param searchValue This value is name to be find
	 * @param pageNumber  This value is the page number
	 * @param pageSize    This value is the size of one page
	 * @param sortColumn  This value is the sort column name
	 * @param sortOrder   This value is sort type
	 * @return
	 */
	public Page<ReviewBook> getAllReview(String searchValue, int pageNumber, int pageSize, String sortColumn,
			String sortOrder) {
		Sort sort = null;
		if (sortOrder.equals("DESC")) {
			sort = Sort.by(Sort.Direction.DESC, sortColumn);
		} else if (sortOrder.equals("ASC")) {
			sort = Sort.by(Sort.Direction.ASC, sortColumn);
		}
		Pageable page = PageRequest.of(pageNumber, pageSize, sort);
		return reviewBookRepository.getReviewByName(searchValue, page);
	}

	/**
	 * Method find review by id
	 * 
	 * @param id This value to be find
	 * @return
	 */
	public ReviewBook findReviewbookById(Integer id) {
		return reviewBookRepository.findReviewBookById(id);
	}

	/**
	 * Method get list review by product id with status =1
	 * 
	 * @param proId This value is product id to be find
	 * @return
	 */
	public List<ReviewBook> getReviewBookByProductWithStatus(Integer proId) {
		return reviewBookRepository.findReviewBookByProductIdWithStatus(proId);
	}

	/**
	 * Method check exist review (to review)
	 * 
	 * @param customerId This value is account id to be find
	 * @param proId      This value is product id to be find
	 * @return
	 */
	public ReviewBook checkExistReview(Integer customerId, Integer proId) {
		return reviewBookRepository.checkExistReview(customerId, proId);
	}

	/**
	 * Method get list review by product
	 * 
	 * @param proId This value is product id to be find
	 * @return
	 */
	public List<ReviewBook> getReviewBookByProduct(Integer proId) {
		return reviewBookRepository.findReviewBookByProductId(proId);
	}

	/**
	 * Method get list review by account id
	 * 
	 * @param customerId This value is account id to be find
	 * @param pageNumber This value is the page number
	 * @param pageSize   This value is the size of one page
	 * @return
	 */
	public Page<ReviewBook> getAllReviewByUser(Integer customerId, int pageNumber, int pageSize) {

		Pageable page = PageRequest.of(pageNumber, pageSize);
		return reviewBookRepository.getAllReviewByUser(customerId, page);
	}
}
