$(document).ready(function(){
    listarProdutos("https://mks-challenge-api-frontend.herokuapp.com/api/v1/products?page=1&rows=50&sortBy=id&orderBy=DESC")
})

function listarProdutos(link){
    $.ajax({
        url : link,
        type : "get",
        dataType : "json",
        contentType : "application/json"
    }).done(function(produtos){
        produtos.products.forEach((pro) =>{
            // listaProdutos.push(pro.name)
            //CRIA A DIV DE PRODUTOS
            divProduto = $("<div>",{
                class: 'produto'
            },"</div>")
            
            divProduto.append("<img src="+pro.photo+" width='250px' height='250px'>")
            titleProduto = "<h3 class='titleProduto'>"+pro.name+"</h3>";
            brandProduto = "<label class='marcaProduto'>"+pro.brand+"</label>"
            descProduto = "<label class='descProduto'>"+pro.description+"</label>"
            priceProduto = "<label class='priceProduto'>"+trataValor(pro.price,0)+"</label>"
            divProduto.append(titleProduto)
            divProduto.append(brandProduto)
            divProduto.append("<hr>")
            divProduto.append(descProduto)
            divProduto.append(priceProduto)
            $(".galeria").append(divProduto)
            //
        })
        $("input[name=pesquisar]").keyup(function(){
            buscaProdutos($(this).val().toLowerCase())
        })
        ///
    })
}

function buscaProdutos(produto){
    $(".produto .titleProduto").each(function(){
        if($(this).text().toLowerCase().indexOf(produto.toLowerCase()) > -1){
            $(this).parents(".produto").show(500)
        }else if(produto.toLowerCase() == ""){
            $(this).parents(".produto").show(500)
        }else{
            $(this).parents(".produto").hide(500)
        }
    })
}

function trataValor(valor,tratamento){
    if(tratamento == 0){
        //TRATAENTO PARA EXIBIR NA TELA
        return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(valor).replace("R$","").trim()
    }else{
        //TRATAMENTO PARA PROCESSAR NO BACKEND
        var quantidade = 0;
        for (var i = 0; i < valor.length; i++) {
            if (valor[i] == "," || valor[i] == "." ) {
                quantidade++
            }
        }
        //PERGUNTA SE A QUANTIDADE DE VIRGULAS E IGUAL A DOIS
        if(quantidade == 2){
            return valor.replace(",",".").replace(".","")
        }else{
            return valor.replace(",",".").trim()
        }
    }
}