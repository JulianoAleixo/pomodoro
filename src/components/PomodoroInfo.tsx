const PomodoroInfo = () => {
    return (
        <div className="max-w-3xl mx-auto p-6 text-white leading-relaxed">
            <h1 className="text-3xl font-bold mb-6">Método Pomodoro</h1>

            <section className="my-6">
                <h2 className="text-xl font-semibold mb-2">
                    O que é o Pomodoro?
                </h2>
                <p>
                    O método Pomodoro é uma técnica de gerenciamento de tempo
                    criada no final dos anos 1980 por Francesco Cirillo. A ideia
                    central é dividir o trabalho em blocos de foco intenso
                    chamados pomodoros, geralmente com 25 minutos de duração,
                    intercalados com breves pausas. Ao final de alguns ciclos,
                    uma pausa maior é realizada para recuperar energia mental.
                </p>
            </section>

            <hr />

            <section className="my-6">
                <h2 className="text-xl font-semibold mb-2">
                    Benefícios do método
                </h2>
                <p>
                    A técnica ajuda a manter a concentração ao reduzir
                    distrações e promover períodos curtos e sustentáveis de
                    foco. Também evita fadiga mental ao introduzir pequenas
                    pausas que preservam sua produtividade ao longo do dia. Além
                    disso, auxilia na construção de disciplina, melhora a
                    percepção do tempo necessário para tarefas e reduz a
                    sensação de sobrecarga.
                </p>
            </section>

            <hr />

            <section className="my-6">
                <h2 className="text-xl font-semibold mb-2">
                    Por que existem diferentes tipos de pausa?
                </h2>
                <p>
                    As pausas curtas, normalmente de 5 minutos, servem para
                    relaxar brevemente sem perder o ritmo do trabalho. Elas
                    permitem descanso suficiente para manter o foco, mas são
                    rápidas o bastante para não quebrar a produtividade.
                </p>
                <p className="mt-3">
                    Já a pausa longa, tradicionalmente de 15 minutos, é aplicada
                    após alguns ciclos de trabalho. Ela oferece recuperação
                    mental mais profunda, reduzindo cansaço acumulado e
                    prevenindo queda de desempenho após longos períodos de
                    atividade cognitiva.
                </p>
            </section>

            <hr />

            <section className="my-6">
                <h2 className="text-xl font-semibold mb-2">
                    Recomendações de uso
                </h2>
                <p>
                    Para obter bons resultados com a técnica, recomenda-se
                    manter os valores clássicos: 25 minutos de trabalho, 5
                    minutos de descanso curto, 15 minutos de descanso longo e 4
                    ciclos para cada descanso longo. Esses tempos equilibram
                    foco, descanso e ritmo de trabalho, funcionando bem para a
                    maioria das pessoas.
                </p>
                <p className="mt-3">
                    Dependendo da tarefa, esses valores podem ser ajustados, mas
                    é aconselhável manter a proporção entre foco e pausas. O
                    mais importante é evitar longos períodos ininterruptos de
                    trabalho e manter as pausas regulares como parte do
                    processo.
                </p>
            </section>
        </div>
    );
};

export default PomodoroInfo;
