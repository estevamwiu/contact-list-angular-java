package br.com.list.contact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.list.contact.entities.Group;

public interface GroupRepository extends JpaRepository<Group, Long> {

}
