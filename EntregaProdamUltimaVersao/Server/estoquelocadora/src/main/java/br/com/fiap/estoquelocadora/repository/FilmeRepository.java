package br.com.fiap.estoquelocadora.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fiap.estoquelocadora.model.Filme;

public interface FilmeRepository extends JpaRepository<Filme, Long> {


}
