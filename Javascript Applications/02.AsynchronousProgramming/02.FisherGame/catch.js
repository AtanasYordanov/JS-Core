function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/appdata/kid_BkJbnQek4/biggestCatches';
    const username = 'user';
    const password = 'user';
    const token = 'Basic ' + btoa(`${username}:${password}`);

    const $catches = $('#catches');
    const $angler = $('#addForm .angler');
    const $weight = $('#addForm .weight');
    const $species = $('#addForm .species');
    const $location = $('#addForm .location');
    const $bait = $('#addForm .bait');
    const $captureTime = $('#addForm .captureTime');

    $('.load').on('click', loadCatches);
    $('.add').on('click', addCatch);

    function loadCatches() {
        const request = {
            url: baseUrl,
            method: "GET",
            headers: {'Authorization': token}
        };

        $.ajax(request)
            .then(data => renderCatches(data))
    }

    function addCatch() {
        const data = JSON.stringify({
            angler: $angler.val(),
            weight: +($weight.val()),
            species: $species.val(),
            location: $location.val(),
            bait: $bait.val(),
            captureTime: +($captureTime.val())
        });

        let request = {
            url: baseUrl,
            method: "POST",
            headers: {'Authorization': token, 'Content-Type': 'application/json'},
            data: data
        };

        $.ajax(request).then(() => loadCatches());

        $angler.val('');
        $weight.val('');
        $species.val('');
        $location.val('');
        $bait.val('');
        $captureTime.val('');
    }

    function updateCatch() {
        const catchId = $(this).parent().attr('data-id');
        const data = JSON.stringify({
            angler: $(this).parent().find('.angler').val(),
            weight: +($(this).parent().find('.weight').val()),
            species: $(this).parent().find('.species').val(),
            location: $(this).parent().find('.location').val(),
            bait: $(this).parent().find('.bait').val(),
            captureTime: +($(this).parent().find('.captureTime').val())
        });

        let request = {
            url: `${baseUrl}/${catchId}`,
            method: "PUT",
            headers: {'Authorization': token, 'Content-Type': 'application/json'},
            data: data
        };

        $.ajax(request).then();
    }

    function deleteCatch() {
        const catchId = $(this).parent().attr('data-id');

        let request = {
            url: `${baseUrl}/${catchId}`,
            method: "DELETE",
            headers: {'Authorization': token, 'Content-Type': 'application/json'},
        };

        $.ajax(request).then();
        $(this).parent().remove();
    }

    function renderCatches(data) {
        $catches.empty();

        data.forEach(c => {
            let $html = $(`
                <div class="catch" data-id="${c['_id']}">
                    <label>Angler</label>
                    <input type="text" class="angler" value="${c['angler']}"/>
                    <label>Weight</label>
                    <input type="number" class="weight" value="${c['weight']}"/>
                    <label>Species</label>
                    <input type="text" class="species" value="${c['species']}"/>
                    <label>Location</label>
                    <input type="text" class="location" value="${c['location']}"/>
                    <label>Bait</label>
                    <input type="text" class="bait" value="${c['bait']}"/>
                    <label>Capture Time</label>
                    <input type="number" class="captureTime" value="${c['captureTime']}"/>
                    <button class="update">Update</button>
                    <button class="delete">Delete</button>
                </div>`)

            $catches.append($html);
            $html.find('.update').on('click', updateCatch);
            $html.find('.delete').on('click', deleteCatch);
        });
    }
}
