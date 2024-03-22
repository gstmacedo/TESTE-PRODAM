package br.com.fiap.estoquelocadora.controller;

import org.springframework.beans.factory.annotation.Autowired;

//import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.com.fiap.estoquelocadora.model.Filme;
import br.com.fiap.estoquelocadora.repository.FilmeRepository;
import jakarta.validation.Valid;


@RestController
@RequestMapping("filme")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class FilmeController {
    
    @Autowired
    FilmeRepository repository;

    @GetMapping
    public List<Filme> index(){
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public Filme create(@RequestBody @Valid Filme filme){
        return repository.save(filme);
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<Filme> get(@PathVariable Long id) {
        
        
        return repository.findById(id)
                        .map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound()
                        .build());  
    }

    @DeleteMapping(path = "{id}")
    @ResponseStatus(NO_CONTENT)
    public void destroy(@PathVariable Long id) {
        
        verificarSeExisteFilme(id);
        repository.deleteById(id);

    }

    @PutMapping(path = "{id}")
    @ResponseStatus(OK)
    public Filme update(@PathVariable Long id, @RequestBody Filme filme ) {
        
        verificarSeExisteFilme(id);
        filme.setId(id);
        repository.save(filme);
        return filme;
    }

    private void verificarSeExisteFilme(Long id) {
        repository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "id do filme não encontrado"));
    }
}
