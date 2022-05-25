package com.example.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.model.Account;
import com.example.service.AccountService;

@Controller
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AccountController {
	private final AccountService accountService;

	/**
	 * 
	 * @param accountService
	 */
	public AccountController(AccountService accountService) {
		this.accountService = accountService;
	}

	/**
	 * This method return registered user account
	 * 
	 * @param account The value to be inserted
	 * @return account
	 */
	@PostMapping("/registerAccount")
	public ResponseEntity<Account> insertAccount(@RequestBody Account account) {
		Account acc = accountService.addAccount(account);
		return new ResponseEntity<>(acc, HttpStatus.OK);
	}

	/**
	 * 
	 * @param userData
	 * @return
	 */
	@PostMapping("/loginAdmin")
	public ResponseEntity<?> loginAdmin(@RequestBody Account userData) {

		Account user = accountService.findAcountByEmail(userData.getEmail());
		System.out.println(user.getRole());
		if (!userData.getRole())
			if (userData.getPassword().equals(user.getPassword()))
				return ResponseEntity.ok(user);
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Error Message");
	}

	/**
	 * This method return account find by email
	 * 
	 * @param email The value to be find
	 * @return account
	 */
	@GetMapping("/loginUser/{email}")
	public ResponseEntity<Account> loginUser(@PathVariable("email") String email) {
		Account user = accountService.findAcountByEmail(email);
		return new ResponseEntity<>(user, HttpStatus.OK);

	}

	/**
	 * This method return list user account
	 * 
	 * @param pageNumber  This value is the page number
	 * @param pageSize    This value is the size of one page
	 * @param searchValue This value to be find
	 * @param sortColumn  This value is the sort column name
	 * @param sortOrder   This value is sort type
	 * @return
	 */
	@GetMapping("/getAllAccountUser")
	public ResponseEntity<Page<Account>> getAllAccountUser(
			@RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
			@RequestParam(name = "pageSize", required = false, defaultValue = "3") Integer pageSize,
			@RequestParam(name = "searchValue", required = false) String searchValue,
			@RequestParam(name = "sortColumn", required = false, defaultValue = "id") String sortColumn,
			@RequestParam(name = "sortOrder", defaultValue = "DESC", required = false) String sortOrder) {
		Page<Account> acc = accountService.getAllAccountUser(searchValue, pageNumber, pageSize, sortColumn, sortOrder);
		return new ResponseEntity<>(acc, HttpStatus.OK);

	}

	/**
	 * This method to be update user account
	 * 
	 * @param id  This value is the account id
	 * @param acc This value to be update
	 * @return
	 */
	@PutMapping("/updateAccount/{id}")
	public ResponseEntity<Account> updateAccount(@PathVariable("id") Integer id, @RequestBody Account acc) {
		Account account = accountService.findAccountById(id);
		account.setName(acc.getName());
		account.setAddress(acc.getAddress());
		account.setStatus(acc.getStatus());
		account.setPassword(acc.getPassword());
		Account updateAcc = accountService.updateAccount(account);
		return new ResponseEntity<>(updateAcc, HttpStatus.OK);
	}

}
