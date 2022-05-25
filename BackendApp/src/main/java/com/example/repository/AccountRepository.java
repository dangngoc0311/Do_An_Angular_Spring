package com.example.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.model.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
	/**
	 * Method find account by id
	 * 
	 * @param email This value to be find
	 * @return
	 */
	Account findByEmail(String email);

	/**
	 * Method find account by name with pagination
	 * 
	 * @param searchValue This value to be find
	 * @param page
	 * @return
	 */
	@Query(value = "SELECT * FROM Account  WHERE name LIKE %:searchValue% and role=1", nativeQuery = true)
	Page<Account> getAllAccountUser(@Param("searchValue") String searchValue, Pageable page);

	/**
	 * Method find account by id
	 * 
	 * @param id
	 * @return
	 */
	Account findAccountById(Integer id);

}
