package eggtalk.eggtalk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import eggtalk.eggtalk.entity.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, String> {
}