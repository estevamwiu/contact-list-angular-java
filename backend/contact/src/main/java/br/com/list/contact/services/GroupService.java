package br.com.list.contact.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.list.contact.entities.Group;
import br.com.list.contact.repositories.GroupRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class GroupService {

    @Autowired
    private GroupRepository repository;

    public List<Group> getGroups() {
        return repository.findAll();
    }

    public Group getGroupById(long id) {
        return repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Grupo não encontrado."));
    }

    public void deleteGroupById(long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Grupo não existente.");
        }
    }

    public Group saveGroup(Group group) {
        return repository.save(group);
    }
}
