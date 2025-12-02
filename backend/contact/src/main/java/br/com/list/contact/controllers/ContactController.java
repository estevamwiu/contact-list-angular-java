package br.com.list.contact.controllers;

import br.com.list.contact.dtos.ContactDTO;
import br.com.list.contact.entities.Contact;
import br.com.list.contact.entities.Group;
import br.com.list.contact.repositories.GroupRepository;
import br.com.list.contact.services.ContactService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {

    @Autowired
    private ContactService service;

    @Autowired
    private GroupRepository groupRepository;

    @GetMapping
    public List<Contact> list() {
        return service.list();
    }

    @GetMapping("{id}")
    public Contact getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<Contact> create(@RequestBody ContactDTO dto) {

        Group group = groupRepository.findById(dto.getGroupId())
                .orElseThrow(() -> new RuntimeException("Grupo não encontrado"));

        Contact contact = new Contact();
        contact.setName(dto.getName());
        contact.setPhone(dto.getPhone());
        contact.setEmail(dto.getEmail());
        contact.setAddress(dto.getAddress());
        contact.setNotes(dto.getNotes());
        contact.setGroup(group);

        Contact saved = service.save(contact);

        URI location = URI.create("/api/contacts/" + saved.getId());
        return ResponseEntity.created(location).body(saved);
    }

    @PutMapping("{id}")
    public ResponseEntity<Contact> update(@PathVariable Long id, @RequestBody ContactDTO dto) {

        Contact existing = service.getById(id);

        Group group = groupRepository.findById(dto.getGroupId())
                .orElseThrow(() -> new RuntimeException("Grupo não encontrado"));

        existing.setName(dto.getName());
        existing.setPhone(dto.getPhone());
        existing.setEmail(dto.getEmail());
        existing.setAddress(dto.getAddress());
        existing.setNotes(dto.getNotes());
        existing.setGroup(group);

        Contact updated = service.save(existing);

        return ResponseEntity.ok(updated);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
