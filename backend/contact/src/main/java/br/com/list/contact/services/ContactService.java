package br.com.list.contact.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.list.contact.entities.Contact;
import br.com.list.contact.repositories.ContactRepository;

@Service
public class ContactService {

    @Autowired
    private ContactRepository repository;

    public Contact save(Contact contact) {
        return repository.save(contact);
    }

    public Contact getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado"));
    }

    public List<Contact> list() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
