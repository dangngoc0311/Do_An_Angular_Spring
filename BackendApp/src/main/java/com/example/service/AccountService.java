package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.example.model.Account;
import com.example.repository.AccountRepository;

@Service
public class AccountService {
	private final AccountRepository accountRepository;

	@Autowired
	public AccountService(AccountRepository accountRepository) {
		this.accountRepository = accountRepository;
	}

	/**
	 * Method find account by email
	 * 
	 * @param email This value to be find
	 * @return
	 */
	public Account findAcountByEmail(String email) {
		return accountRepository.findByEmail(email);

	}

	/**
	 * Method insert account
	 * 
	 * @param acc This value to be insert
	 * @return
	 */
	public Account addAccount(Account acc) {
		return accountRepository.save(acc);

	}

	/**
	 * Method get list account ( ADMIN )
	 * 
	 * @param searchValue This value to be find
	 * @param pageNumber  This value is the page number
	 * @param pageSize    This value is the size of one page
	 * @param sortColumn  This value is the sort column name
	 * @param sortOrder   This value is sort type
	 * @return
	 */
	public Page<Account> getAllAccountUser(String searchValue, int pageNumber, int pageSize, String sortColumn,
			String sortOrder) {
		Sort sort = null;
		if (sortOrder.equals("DESC")) {
			sort = Sort.by(Sort.Direction.DESC, sortColumn);
		} else if (sortOrder.equals("ASC")) {
			sort = Sort.by(Sort.Direction.ASC, sortColumn);
		}
		Pageable page = PageRequest.of(pageNumber, pageSize, sort);
		return accountRepository.getAllAccountUser(searchValue, page);
	}

	/**
	 * Method find account by id
	 * 
	 * @param id This value to be find
	 * @return
	 */
	public Account findAccountById(Integer id) {
		return accountRepository.findAccountById(id);
	}

	/**
	 * Method update account
	 * 
	 * @param acc This value to be update
	 * @return
	 */
	public Account updateAccount(Account acc) {
		return accountRepository.save(acc);

	}
}
